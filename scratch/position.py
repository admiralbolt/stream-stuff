import sys
import os
import time

sys.path.append(os.path.realpath(os.path.join(
  os.getcwd(),
  "..",
  "stream_backend/api/obs"
)))

from obs_client import OBSClient
from obswebsocket.requests import *

COLUMN_WIDTH = 350
BORDER = 15
SCENE = "OneSceneToRuleThemAll"

BREAD = {
  "camera": "Shitty Webcam",
  "spotify": "Spotify!",
  "chat": "Twitch Chat",
  "desktop": "Muh Desktop"
}

client = OBSClient()
time.sleep(0.5)

cam = client.call(GetSceneItemProperties(
  BREAD["camera"],
  scene_name=SCENE
))

print(cam)

scale = COLUMN_WIDTH / cam.getSourcewidth()

client.call(SetSceneItemProperties(
  BREAD["camera"],
  scene_name=SCENE,
  scale={
    "x": scale,
    "y": scale
  },
  position={
    "x": 1920 - COLUMN_WIDTH - BORDER,
    "y": BORDER
  }
))

cam = client.call(GetSceneItemProperties(
  BREAD["camera"],
  scene_name=SCENE
))

spotify = client.call(GetSceneItemProperties(
  BREAD["spotify"],
  scene_name=SCENE
))

spotify_scale = COLUMN_WIDTH / spotify.getSourcewidth()

client.call(SetSceneItemProperties(
  BREAD["spotify"],
  scene_name=SCENE,
  scale={
    "x": spotify_scale,
    "y": spotify_scale
  },
  position={
    "x": 1920 - COLUMN_WIDTH - BORDER,
    "y": BORDER + cam.getSourceheight() * scale
  }
))

chat = client.call(GetSceneItemProperties(
  BREAD["chat"],
  scene_name=SCENE
))

chat_scale = COLUMN_WIDTH / chat.getSourcewidth()

client.call(SetSceneItemProperties(
  BREAD["chat"],
  scene_name=SCENE,
  scale={
    "x": chat_scale,
    "y": chat_scale
  },
  position={
    "x": 1920 - COLUMN_WIDTH - BORDER,
    "y": 1080 - BORDER - chat.getSourceheight() * chat_scale
  }
))

desktop = client.call(GetSceneItemProperties(
  BREAD["desktop"],
  scene_name=SCENE
))

x_scale = (1920 - 2 * BORDER) / desktop.getSourcewidth()
y_scale = (1080 - 2 * BORDER) / desktop.getSourceheight()

client.call(SetSceneItemProperties(
  BREAD["desktop"],
  scene_name=SCENE,
  scale={
    "x": x_scale,
    "y": y_scale
  },
  position={
    "x": BORDER,
    "y": BORDER
  }
))


client.transition()
