import asyncio
import requests

from api.twitch_bot.commands.base_command import BaseCommand

JOKE_URL = "https://official-joke-api.appspot.com/random_joke"

class JokeCommand(BaseCommand):
  """My funniest command yet.

  Please kill me.
  """
  name = "joke"

  async def execute(self, context):
    data = requests.get(JOKE_URL).json()

    await context.send(f"{data['setup']}")
    await context.send(f"{data['punchline']}")
