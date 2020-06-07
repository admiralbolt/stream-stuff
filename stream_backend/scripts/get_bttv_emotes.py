"""Loads all Global Better Twitch Tv Emotes.

Fetches the betterttv api here:
https://api.betterttv.net/3/cached/emotes/global

And loads all emotes into the CustomEmote model.
"""
import requests

from api.models import CustomEmote


def run(*args):
  r = requests.get("https://api.betterttv.net/3/cached/emotes/global")

  for emote_data in r.json():
    emote = CustomEmote(
      name=emote_data["code"],
      url=f"https://cdn.betterttv.net/emote/{emote_data['id']}/1x"
    )
    emote.save()
