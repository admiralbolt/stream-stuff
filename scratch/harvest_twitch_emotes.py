"""
This script is flaky as fuck and is probably already broken.

Use at your own risk.
"""
import argparse
import os
import requests
import shutil

from bs4 import BeautifulSoup


SAVE_DIR = "emotes"

FILE_TEMPLATE = """export default twitchEmotes = Set([
%s
])
"""


def download_emotes(twitch_emotes):
  if not os.path.isdir(SAVE_DIR):
    os.makedirs(SAVE_DIR)

  for emote_name, image_url in twitch_emotes.items():
    print(f"emote_name: {emote_name}, image_url: {image_url}")
    print(image_url)
    res = requests.get(image_url)
    with open(os.path.join(SAVE_DIR, f"{emote_name}.png"), "wb") as wh:
      wh.write(res.content)

def copy_emotes(twitch_emotes):
  for emote_name in twitch_emotes:
    shutil.copyfile(
      os.path.join(SAVE_DIR, f"{emote_name}.png"),
      os.path.join("../overlay/public/assets/images/twitch_emotes/", f"{emote_name}.png")
    )

def write_emotes(twitch_emotes):
  with open("../overlay/app/utils/twitch-emotes.js", "w") as wh:
    wh.write(FILE_TEMPLATE % (
      ",\n".join([f"'{key}'" for key in twitch_emotes.keys()])
    ,))


def main(download=False, copy=False, write=False):
  # Load all normal twitch emotes.
  res = requests.get("https://twitchemotes.com/")
  soup = BeautifulSoup(res.text)

  twitch_emotes = {}

  for tag in soup.find_all("center"):
    # Ignore the tubo emotes for the most part.
    if tag.get_text() in twitch_emotes or "/" in tag.get_text():
      continue

    image_source = tag.find("img")["src"]
    emote_name = tag.get_text().replace("\\", "\\\\")
    print(emote_name)
    twitch_emotes[emote_name] = image_source

  if download:
    download_emotes(twitch_emotes)

  if copy:
    copy_emotes(twitch_emotes)

  if write:
    write_emotes(twitch_emotes)



if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("--download", dest="download", action="store_true", default=False, help="Download the emotes")
  parser.add_argument("--copy", dest="copy", action="store_true", default=False, help="Copy to /public/assets/images/twitch_emotes")
  parser.add_argument("--write", dest="write", action="store_true", default=False, help="Write to twitch-emotes.js")
  args = parser.parse_args()
  main(args.download, args.copy, args.write)
