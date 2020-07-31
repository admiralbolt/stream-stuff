import requests

# Make sure not to show these on stream.
from api.utils._secrets import client_id, client_secret

# Gotta let em know.
THE_BEST_TWITCH_STREAMER_ID = 83968979

API_BASE = "https://api.twitch.tv/helix"

class TwitchClient:

  def get_oauth_token(self):
    from api.utils.key_value_utils import get_value

    return get_value("twitch_oauth_token")

  def get_user_id(self, username):
    """Get a user id by username."""
    return requests.get(
      f"{API_BASE}/users?login={username}",
      headers={
        "Authorization": f"Bearer {self.get_oauth_token()}",
        "Client-Id": client_id
      }
    ).json()["data"][0]["id"]

  def clip_that(self):
    """Clips that shit."""
    from api.models import TwitchClip

    res = requests.post(
      f"{API_BASE}/clips?broadcaster_id={THE_BEST_TWITCH_STREAMER_ID}",
      headers={
        "Authorization": f"Bearer {self.get_oauth_token()}",
        "Client-Id": client_id
      }
    )

    data = res.json()["data"][0]

    clip = TwitchClip(name=data["id"], edit_url=data["edit_url"])
    clip.save()
    return
