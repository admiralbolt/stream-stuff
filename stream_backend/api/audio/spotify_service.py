import asyncio
import base64
import logging
import requests
import time
import webbrowser

from urllib.parse import quote

from api._secrets import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET
from api.const import SPOTIFY_ACCESS_TOKEN, SPOTIFY_AUTHORIZATION_CODE, SPOTIFY_REFRESH_TOKEN, SPOTIFY_SHOULD_POLL
from api.utils.key_value_utils import async_get_value, async_set_value, get_value, set_value
from api.utils.stoppable_thread import StoppableThread
from api.utils.websocket_client import WebSocketClient

logger = logging.getLogger(__name__)

SCOPES = [
  "user-read-playback-position",
  "user-read-currently-playing"
]

ACCOUNT_URL = "https://accounts.spotify.com";
REDIRECT_URL = "http://localhost:8000/spotify_authorization";

AUTH_URL = f"{ACCOUNT_URL}/authorize?response_type=code&client_id={SPOTIFY_CLIENT_ID}&scope={quote(' '.join(SCOPES))}&redirect_uri={REDIRECT_URL}"
TOKEN_URL = f"{ACCOUNT_URL}/api/token"

API_URL = "https://api.spotify.com/v1"


class SpotifyService:
  """Handles spotify oauth and currently playing polling.

  A back and forth is required for oauth. See:
  https://developer.spotify.com/documentation/general/guides/authorization-guide/

  First we need to authorize access for our app. This is done by opening a
  browser tab and accepting. The redirect points to the authorize_spotify view
  in views.py. This view then updates the passed back authorization code in the
  key value store.
  """

  def __init__(self, websockets):
    # While the access_token is mimicked by the keyvalue store,
    # We don't want to make a db access for it's value every 1-2
    # seconds. The tokens need to be loaded in the async initialize
    # for db reasons.
    self.access_token = None
    self.refresh_token = None
    self.is_authorized = False
    self.websockets = websockets
    self.should_poll = True

    # A thread used for waiting on auth credentials to update. The spotify oauth
    # has to use a browser redirect to get an activation code and there isn't
    # a flow using direct requests that can get the correct permissions.
    self.auth_thread = None
    # A thread used for polling the currently playing song and sending it to
    # the polling plugin via websocket.
    self.polling_thread = None
    # A thread used for refreshing the auth credentials every thirty minutes.
    self.refresh_thread = None

  def start_polling_and_refresh(self):
    self.polling_thread = StoppableThread(target=self.poll)
    self.polling_thread.start()
    self.refresh_thread = StoppableThread(target=self.refresh)
    self.refresh_thread.start()

  def poll(self):
    self.poll_loop = asyncio.new_event_loop()
    asyncio.set_event_loop(self.poll_loop)
    asyncio.run(self.async_poll())

  async def async_poll(self):
    """Polls spotify for the currently playing song.

    If a song is playing send it to the frontend plugin via websocket.
    """
    socket = WebSocketClient(7001)
    await socket.connect()

    while not self.polling_thread.stopped():
      await asyncio.sleep(1)
      if not self.should_poll:
        continue

      song_request = self.get_currently_playing()
      if song_request.status_code != requests.codes.ok:
        continue

      data = song_request.json()
      if not self.data_is_valid(data):
        logger.info(f"SPOTIFY ERROR: {data}")

      await socket.send({
        "album_image_url": data["item"]["album"]["images"][1]["url"],
        "artist": ", ".join([artist["name"] for artist in data["item"]["artists"]]),
        "album": data["item"]["album"]["name"],
        "song": data["item"]["name"],
        "progress_ms": data["progress_ms"],
        "duration_ms": data["item"]["duration_ms"]
      })

  def data_is_valid(self, data):
    if not data:
      return False

    try:
      data["item"]["album"]["images"][1]["url"]
      data["item"]["artists"]
      data["item"]["album"]["name"]
      data["item"]["name"]
      data["progress_ms"]
      data["item"]["duration_ms"]
    except KeyError:
      return False

    return True

  def refresh(self):
    while not self.refresh_thread.stopped():
      time.sleep(120)
      logger.info("[spotify_service.py] refreshing tokens...")
      self.get_tokens(use_refresh=True)
      time.sleep(60 * 30 - 120)


  def check_and_test_auth(self):
    """Thread that 'waits' until auth is successful.

    This is done by waiting, getting the latest value of the saved authorization
    code, and attempting to fetch oauth & refresh tokens.
    """
    time.sleep(10)
    webbrowser.open(AUTH_URL)

    while not self.is_authorized:
      time.sleep(5)
      self.get_tokens()

    # Finally start our polling & refresh threads.
    self.start_polling_and_refresh()

  async def initialize(self):
    """Boy howdy this is complex.

    We check to see if we are authorized by making a test request. If we are,
    cool we're done. Otherwise we'll reauth spotify using the browser redirect.
    This will *eventually* update the access & refresh tokens in the keystore.
    But we'll need to check for this and we need to do this check in a separate
    thread so we don't hang Django.
    """
    self.access_token = await async_get_value(SPOTIFY_ACCESS_TOKEN)
    self.refresh_token = await async_get_value(SPOTIFY_REFRESH_TOKEN)
    self.should_poll = await async_get_value(SPOTIFY_SHOULD_POLL)
    request_code = self.get_currently_playing().status_code
    if request_code == requests.codes.ok or request_code == requests.codes.no_content:
      self.start_polling_and_refresh()
      return

    # Go through the oauth flow.
    self.auth_thread = StoppableThread(target=self.check_and_test_auth)
    self.auth_thread.start()
    return

  def get_tokens(self, use_refresh=False):
    """Makes an api request to get an oauth & refresh token."""
    post_data = {
      "grant_type": "refresh_token" if use_refresh else "authorization_code",
      "code": get_value(SPOTIFY_AUTHORIZATION_CODE),
      "redirect_uri": REDIRECT_URL
    }
    if use_refresh:
      post_data["refresh_token"] = get_value(SPOTIFY_REFRESH_TOKEN)

    auth_key = base64.urlsafe_b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()).decode()

    r = requests.post(
      TOKEN_URL,
      headers={
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Basic {auth_key}"
      },
      data="&".join([f"{quote(key)}={quote(value)}" for key, value in post_data.items()])
    )

    if r.status_code != requests.codes.ok:
      return

    self.is_authorized = True
    data = r.json()
    set_value(SPOTIFY_ACCESS_TOKEN, data["access_token"])
    self.access_token = data["access_token"]
    if "refresh_token" in data:
      set_value(SPOTIFY_REFRESH_TOKEN, data["refresh_token"])
    return

  def get_currently_playing(self):
    """Gets the currently playing song."""
    return requests.get(
      f"{API_URL}/me/player/currently-playing",
      headers={
        "Accept": "application/json",
        "Authorization": f"Bearer {self.access_token}"
      }
    )
