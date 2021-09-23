import asyncio
import requests

from api.twitch_bot.commands.base_command import BaseCommand

JOKE_URL = "https://v2.jokeapi.dev/joke/Any"

class JokeCommand(BaseCommand):
  """My funniest command yet.

  Please kill me.
  """
  name = "joke"

  async def execute(self, context):
    data = requests.get(JOKE_URL).json()

    if data["type"] == "twopart":
      await context.send(f"{data['setup']}")
      await context.send(f"{data['delivery']}")
    else:
      await context.send(f"{data['joke']}")
