import random
import requests

from bs4 import BeautifulSoup

from api.twitch_bot.commands.base_command import BaseCommand

MOAR_PASTA_URL = "https://twitch.gimu.org/?sort=random"

class PastaCommand(BaseCommand):
  """
  Hbox gave me a ride to a local yesterday. Every time we approached a green
  light, he would slow down until the light turned yellow, and then speed
  through. He kept muttering "fucking Clutchbox" every time he did it.
  """
  name = "pasta"

  async def execute(self, context):
    response = requests.get(MOAR_PASTA_URL)
    soup = BeautifulSoup(response.text, features="html.parser")
    pastas = soup.find_all("div", class_="pasta-copy")
    pasta = pastas[0]["data-clipboard-text"]

    await context.send(f"{pasta}")
