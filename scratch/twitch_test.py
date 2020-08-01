import os
import sys

sys.path.append(os.path.realpath(os.path.join(
  os.getcwd(),
  "..",
  "stream_backend/api/utils"
)))

sys.path.append(os.path.realpath(os.path.join(
  os.getcwd(),
  "..",
  "stream_backend"
)))

from twitch_client import TwitchClient

client = TwitchClient()
