import sys
import os
import time

sys.path.append(os.path.realpath(os.path.join(
  os.getcwd(),
  "..",
  "stream_backend/api/obs"
)))

sys.path.append(os.path.realpath(os.path.join(
  os.getcwd(),
  "..",
  "stream_backend"
)))

from obs_client import OBSClient
from obswebsocket.requests import *

COLUMN_WIDTH = 350
BORDER = 25
# SCENE = "OneSceneToRuleThemAll"
SCENE = "GAMER"

BREAD = {
  "camera": "Shitty Webcam",
  "spotify": "Spotify!",
  "chat": "Twitch Chat",
  "desktop": "Muh Desktop",
  "events": "Twitch Event List"
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

events = client.call(GetSceneItemProperties(
  BREAD["events"],
  scene_name=SCENE
))

if "sourceWidth" in events.datain and events.getSourcewidth() != 0:
  event_scale = COLUMN_WIDTH / events.getSourcewidth()

  client.call(SetSceneItemProperties(
    BREAD["events"],
    scene_name=SCENE,
    scale={
      "x": event_scale,
      "y": event_scale
    },
    position={
      "x": 1920 - COLUMN_WIDTH - BORDER,
      "y": BORDER + cam.getSourceheight() * scale + spotify.getSourceheight() * spotify_scale
    }
  ))

sub_goal = client.call(GetSceneItemProperties(
  "Sub Goal Plugin",
  scene_name=SCENE
))

if sub_goal.getSourcewidth() != 0:
  sub_goal_scale = COLUMN_WIDTH / sub_goal.getSourcewidth()

  client.call(SetSceneItemProperties(
    "Sub Goal Plugin",
    scene_name=SCENE,
    scale={
      "x": sub_goal_scale,
      "y": sub_goal_scale
    },
    position={
      "x": 1920 - COLUMN_WIDTH - BORDER,
      "y": BORDER + cam.getSourceheight() * scale + spotify.getSourceheight() * spotify_scale
    }
  ))

gc = client.call(GetSceneItemProperties(
  "Gamecube Controller",
  scene_name=SCENE
))

if gc.getSourcewidth() != 0:
  gc_scale = COLUMN_WIDTH / gc.getSourcewidth()

  client.call(SetSceneItemProperties(
    "Gamecube Controller",
    scene_name=SCENE,
    scale={
      "x": gc_scale,
      "y": gc_scale
    },
    position={
      "x": 1920 - COLUMN_WIDTH - BORDER,
      "y": BORDER + cam.getSourceheight() * scale + spotify.getSourceheight() * spotify_scale + events.getSourceheight() * event_scale
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

scene_items = [
  ("Muh Desktop", "full"),
  ("Melee Game", "roi"),
  ("PS1", "roi"),
  ("Ultimate Chicken Horse", "roi"),
]

for scene_name, width_type in scene_items:
  scene_item = client.call(GetSceneItemProperties(
    scene_name,
    scene_name=SCENE
  ))

  print(scene_item)

  print(scene_item.getSourcewidth())
  print(scene_item.getSourceheight())

  if scene_item.getSourcewidth() == 0:
    continue


  if width_type == "full":
    x_scale = (1920 - 2 * BORDER) / scene_item.getSourcewidth()
  else:
    x_scale = (1920 - 3 * BORDER - COLUMN_WIDTH) / (scene_item.getSourcewidth() - scene_item.getCrop()["left"] - scene_item.getCrop()["right"])
  y_scale = (1080 - 2 * BORDER) / scene_item.getSourceheight()

  client.call(SetSceneItemProperties(
    scene_name,
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
