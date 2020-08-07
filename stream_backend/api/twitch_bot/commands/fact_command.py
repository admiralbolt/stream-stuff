import requests

from api.twitch_bot.commands.base_command import BaseCommand

RANDOM_FACT_URL = "https://uselessfacts.jsph.pl/random.json?language=en"

class FactCommand(BaseCommand):
  """Gets a random fact!"""
  name = "fact"

  async def execute(self, context):
    data = requests.get(RANDOM_FACT_URL).json()
    await context.send(f"{data['text']}")
