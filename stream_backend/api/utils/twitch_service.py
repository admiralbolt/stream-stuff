import asyncio
import requests
import time
import webbrowser

from datetime import datetime
from urllib.parse import quote

from api.const import THE_BEST_TWITCH_STREAMER_ID_NO_BIAS, TWITCH_ACCESS_TOKEN, TWITCH_AUTHORIZATION_CODE, TWITCH_REFRESH_TOKEN
from api.models import TwitchClip
from api._secrets import TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET
from api.utils.key_value_utils import async_get_value, async_set_value, get_value, set_value
from api.utils.stoppable_thread import StoppableThread
from api.utils.time_utils import human_readable

SCOPES = [
  "bits:read",
  "clips:edit",
  "channel_subscriptions",
  "chat:edit",
  "channel:read:redemptions",
  "channel:moderate",
  "channel_editor",
  "channel_read"
]

REDIRECT_URL = "http://localhost:8000/twitch_authorization"
AUTH_URL = f"https://id.twitch.tv/oauth2/authorize?client_id={TWITCH_CLIENT_ID}&redirect_uri={REDIRECT_URL}&response_type=code&scope={quote(' '.join(SCOPES))}"
CHANNEL_URL = f"https://api.twitch.tv/kraken/channels/{THE_BEST_TWITCH_STREAMER_ID_NO_BIAS}"
TOKEN_URL = "https://id.twitch.tv/oauth2/token"
API_BASE = "https://api.twitch.tv/helix"

class TwitchService:
  """A service that handles authing twitch and making requests."""

  def __init__(self):
    self.access_token = None
    self.refresh_token = None
    self.is_authorized = False

    # A thread used for waiting on auth credentials to update. The spotify oauth
    # has to use a browser redirect to get an activation code and there isn't
    # a flow using direct requests that can get the correct permissions.
    self.auth_thread = None
    # A thread used for refreshing the auth credentials every thirty minutes.
    self.refresh_thread = None

  def start_refresh(self):
    self.refresh_thread = StoppableThread(target=self.refresh)
    self.refresh_thread.start()

  def refresh(self):
    while not self.refresh_thread.stopped():
      time.sleep(5)
      print("[twitch_service.py] refreshing tokens...")
      self.get_tokens(use_refresh=True)
      time.sleep(60 * 30 - 120)

  def check_and_test_auth(self):
    """Thread that 'waits' until auth is successful.

    This is done by waiting, getting the latest value of the saved authorization
    code, and attempting to fetch oauth & refresh tokens.
    """
    # You see, we need to wait until django finishes booting up, otherwise
    # we will redirect to a url before django can handle it. Don't worry,
    # normally using time.sleep to solve race conditions is a bad practice,
    # but when I do it it's okay.
    time.sleep(10)
    webbrowser.open(AUTH_URL)

    while not self.is_authorized:
      time.sleep(5)
      self.get_tokens()

    # Finally start our refresh thread.
    self.start_refresh()

  async def initialize(self):
    """So,

    We check to see if we have good credentials by making an api request. If we
    have good credentials cool, start the refresh task. Otherwise we reauth
    twitch using the browser redirect. This will eventually update the access
    & refresh tokens in the keystore, we need to check for this and do this
    check in a separate thread so we don't hang Django.
    """
    self.access_token = await async_get_value(TWITCH_ACCESS_TOKEN)
    self.refresh_token = await async_get_value(TWITCH_REFRESH_TOKEN)
    request_code = self.get_user_id("admirallightningbolt").status_code
    if request_code == requests.codes.ok:
      self.start_refresh()
      return

    # Go through the oauth flow.
    self.auth_thread = StoppableThread(target=self.check_and_test_auth)
    self.auth_thread.start()
    return

  def get_tokens(self, use_refresh=False):
    """Makes an api request to get an oauth & refresh token."""
    get_params = {
      "client_id": TWITCH_CLIENT_ID,
      "client_secret": TWITCH_CLIENT_SECRET,
      "grant_type": "refresh_token" if use_refresh else "authorization_code"
    }
    if use_refresh:
      get_params["refresh_token"] = get_value(TWITCH_REFRESH_TOKEN)
    else:
      get_params["code"] = get_value(TWITCH_AUTHORIZATION_CODE)
      get_params["redirect_uri"] = REDIRECT_URL

    r = requests.post(TOKEN_URL, params=get_params)

    if r.status_code != requests.codes.ok:
      return

    self.is_authorized = True
    data = r.json()
    set_value(TWITCH_ACCESS_TOKEN, data["access_token"])
    self.access_token = data["access_token"]
    if "refresh_token" in data:
      set_value(TWITCH_REFRESH_TOKEN, data["refresh_token"])
    return

  ##################
  #### REQUESTS ####
  ##################

  def get_user_id(self, username):
    """Get a user id by username."""
    return requests.get(
      f"{API_BASE}/users?login={username}",
      headers={
        "Authorization": f"Bearer {self.access_token}",
        "Client-Id": TWITCH_CLIENT_ID
      }
    )

  def get_uptime(self):
    """Gets stream uptime!"""
    stream_start = requests.get(
      f"{API_BASE}/streams?user_id={THE_BEST_TWITCH_STREAMER_ID_NO_BIAS}",
      headers={
        "Authorization": f"Bearer {self.access_token}",
        "Client-Id": TWITCH_CLIENT_ID
      }
    ).json()["data"][0]["started_at"]
    stream_elapsed = datetime.utcnow() - datetime.strptime(stream_start, "%Y-%m-%dT%H:%M:%SZ")

    return human_readable(stream_elapsed)

  def get_current_stream_id(self):
    """Gets the current stream id."""
    return requests.get(
      f"{API_BASE}/streams?user_id={THE_BEST_TWITCH_STREAMER_ID_NO_BIAS}",
      headers={
        "Authorization": f"Bearer {self.access_token}",
        "Client-Id": TWITCH_CLIENT_ID
      }
    ).json()["data"][0]["id"]

  def clip_that(self):
    """Clips that shit."""
    res = requests.post(
      f"{API_BASE}/clips?broadcaster_id={THE_BEST_TWITCH_STREAMER_ID_NO_BIAS}",
      headers={
        "Authorization": f"Bearer {self.access_token}",
        "Client-Id": TWITCH_CLIENT_ID
      }
    )

    data = res.json()["data"][0]

    clip = TwitchClip(name=data["id"], edit_url=data["edit_url"])
    clip.save()
    return
