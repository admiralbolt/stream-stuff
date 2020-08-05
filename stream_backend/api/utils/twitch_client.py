import requests

from datetime import datetime

from api.const import THE_BEST_TWITCH_STREAMER_ID_NO_BIAS
from api.models import TwitchClip
from api._secrets import CLIENT_ID, CLIENT_SECRET
from api.utils.key_value_utils import async_get_value
from api.utils.time_utils import human_readable


API_BASE = "https://api.twitch.tv/helix"

class TwitchClient:

  async def get_authorization_header(self):
    """We should recompute the oauth token everytime.

    It could change after refresh, hence this method.
    """
    oauth_token = await async_get_value("twitch_oauth_token")
    return f"Bearer {oauth_token}"

  async def get_user_id(self, username):
    """Get a user id by username."""
    auth_header = await self.get_authorization_header()
    return requests.get(
      f"{API_BASE}/users?login={username}",
      headers={
        "Authorization": auth_header,
        "Client-Id": client_id
      }
    ).json()["data"][0]["id"]

  async def get_uptime(self):
    """Gets stream uptime!"""
    auth_header = await self.get_authorization_header()
    stream_start = requests.get(
      f"{API_BASE}/streams?user_id={THE_BEST_TWITCH_STREAMER_ID_NO_BIAS}",
      headers={
        "Authorization": auth_header,
        "Client-Id": client_id
      }
    ).json()["data"][0]["started_at"]
    stream_elapsed = datetime.utcnow() - datetime.strptime(stream_start, "%Y-%m-%dT%H:%M:%SZ")

    return human_readable(stream_elapsed)

  async def get_current_stream_id(self):
    """Gets the current stream id."""
    auth_header = await self.get_authorization_header()
    return requests.get(
      f"{API_BASE}/streams?user_id={THE_BEST_TWITCH_STREAMER_ID_NO_BIAS}",
      headers={
        "Authorization": auth_header,
        "Client-Id": client_id
      }
    ).json()["data"][0]["id"]

  async def clip_that(self):
    """Clips that shit."""
    auth_header = await self.get_authorization_header()
    res = requests.post(
      f"{API_BASE}/clips?broadcaster_id={THE_BEST_TWITCH_STREAMER_ID_NO_BIAS}",
      headers={
        "Authorization": auth_header,
        "Client-Id": client_id
      }
    )

    data = res.json()["data"][0]

    clip = TwitchClip(name=data["id"], edit_url=data["edit_url"])
    clip.save()
    return
