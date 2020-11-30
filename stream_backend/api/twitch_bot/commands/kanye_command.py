import requests

from api.twitch_bot.commands.base_command import BaseCommand

# Heh, Kanye Rest
KANYE_QUOTE_URL = "https://api.kanye.rest/"

class KanyeCommand(BaseCommand):
  """Gets a random kayne quote!"""
  name = "kanye"

  async def execute(self, context):
    data = requests.get(KANYE_QUOTE_URL).json()
    await context.send(f"{data['quote']}")
