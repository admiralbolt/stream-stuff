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

SHAME = "Shame Cube"


client = OBSClient()
time.sleep(0.5)

cam = client.call(GetSceneItemProperties(
  "Shitty Webcam",
  scene_name=SHAME
))

crop = cam.getCrop()
actual_height = cam.getSourceheight() - crop["top"] - crop["bottom"]
actual_width = cam.getSourcewidth() - crop["left"] - crop["right"]

cam = client.call(SetSceneItemProperties(
  "Shitty Webcam",
  scene_name=SHAME,
  position={
    "x": 960 - actual_width / 2,
    "y": (1080 * (2/3)) - actual_height / 2
  }
))

print(cam)
