import requests

from bs4 import BeautifulSoup

RANDOM_PASTA_URL = "https://www.twitchquotes.com/random"
MOAR_PASTA = "https://twitch.gimu.org/?sort=random"

# response = requests.get(RANDOM_PASTA_URL)
# soup = BeautifulSoup(response.text)
# div = soup.find(id="quote_clipboard_copy_content_0")
# print(div.text)

response = requests.get(MOAR_PASTA)
soup = BeautifulSoup(response.text)
pastas = soup.find_all("div", class_="pasta-copy")
print(pastas[0]["data-clipboard-text"])
