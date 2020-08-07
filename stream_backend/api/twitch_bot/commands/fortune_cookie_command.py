import requests

from bs4 import BeautifulSoup

from api.twitch_bot.commands.base_command import BaseCommand

FORTUNE_URL = "http://www.fortunecookiemessage.com"

class FortuneCookieCommand(BaseCommand):
  """Gets a random fortune cookie!"""
  name = "fortunecookie"

  async def execute(self, context):
    response = requests.get(FORTUNE_URL)
    soup = BeautifulSoup(response.text, features="html.parser")
    # There's really only one, but we need find all for css classes.
    cookies_list = soup.find_all("a", class_="cookie-link")
    fortune = cookies_list[0].text
    # Get our lucky numbers
    bottom = soup.find_all("div", class_="bottom-message")
    next_child_is_the_one = False
    lucky_numbers = ""
    for child in bottom[0].children:
      if next_child_is_the_one:
        lucky_numbers = child.string[2:]
        break

      if hasattr(child, "href") and child.get("href") == "/lotto_numbers.php":
        next_child_is_the_one = True


    await context.send(f"@{context.author.name} {fortune} Lucky numbers: {lucky_numbers}")
