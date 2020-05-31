"""
TURNS OUT
I don't actually need to download all ~2 million twitch emotes. Looks like all
just use the cdn with their ID, so hopefully that continues to work.

Gonna leave this script around in case I end up using it again.

Downloads all twitch emotes using an old version of their api documented here:
https://dev.twitch.tv/docs/v5/reference/chat

We use the Get All Chat Emoticons endpoint which returns a json dump of
every single twitch emote by channel. We then loop through that list and create
TwitchEmote models for each of the entries in the response, and download the
image from the cdn.

I would use the updated version of the api to do this but this endpoint doesn't
exist in the new verison.
"""
import requests

from django.core.files.base import ContentFile

from api.models import TwitchEmote


def run(*args):
  """
  args[0] should be your client id. Don't leak it dumbass.
  """

  emotes_raw = requests.get(
    "https://api.twitch.tv/kraken/chat/emoticons",
    headers={
      "Accept": "application/vnd.twitchtv.v5+json",
      "Client-ID": args[0],
    }
  )
  emotes = emotes_raw.json()["emoticons"]

  for emote in emotes:
    """
    Individual emotes look like:
    {
      "id": 11135,
      "regex": "xanViking",
      "images": {
        "emoticon_set":2126,
        "height":28,
        "width":28,
        "url":"https://static-cdn.jtvnw.net/emoticons/v1/11135/1.0"
      }
    }
    """
    db_emote, was_created = TwitchEmote.objects.update_or_create(
      twitch_id=emote["id"],
      name=emote["regex"],
      emoticon_set=emote["images"]["emoticon_set"],
      height=emote["images"]["height"],
      width=emote["images"]["width"],
      image_url=emote["images"]["url"]
    )
