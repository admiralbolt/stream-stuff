import asyncio
import random

from api.const import CAMERA_COLOR_FILTER, CAMERA_SOURCE
from api.obs.base_script import BaseScript, CONSTANTS
from api.utils.websocket_client import WebSocketClient
from obswebsocket.requests import *

GAMMA = (-1.0, 1.0)
CONTRAST = (-2.0, 1.0)
BRIGHTNESS = (-0.2, 0.3)
SATURATION = (-0.5, 5.0)
HUE_SHIFT = (-180.0, 180.0)
DURATION = 4
TICK = 0.1
MAX_TICK = int(DURATION / TICK)

ONSET_DELAY = 7

def get_random(minmax):
  return minmax[0] + random.random() * (minmax[1] - minmax[0])

class ScrambleCameraFilterScript(BaseScript):

  loop = None
  transition_scene = None

  def execute(self):
    asyncio.run(self.async_execute())

  async def async_execute(self):
    self.websocket_client = WebSocketClient(7004)
    await self.websocket_client.connect()

    # 1. Randomize Color Correction Filter Settings
    # print(self.client.get_source_filter_by_name(CAMERA_SOURCE, CAMERA_COLOR_FILTER))
    gamma = get_random(GAMMA)
    contrast = get_random(CONTRAST)
    brightness = get_random(BRIGHTNESS)
    saturation = get_random(SATURATION)
    hue_shift = get_random(HUE_SHIFT)

    self.call(SetSourceFilterSettings(
      CAMERA_SOURCE,
      CAMERA_COLOR_FILTER,
      {
        "gamma": gamma,
        "contrast": contrast,
        "brightness": brightness,
        "saturation": saturation,
        "hue_shift": hue_shift
      }
    ))

    await asyncio.sleep(ONSET_DELAY)

    for current_tick in range(MAX_TICK):
      # Each tick we want to gradually move the camera filter settings back
      # towards the default value.
      scale = (MAX_TICK - current_tick) / (MAX_TICK)
      self.call(SetSourceFilterSettings(
        CAMERA_SOURCE,
        CAMERA_COLOR_FILTER,
        {
          "gamma": gamma * scale,
          "contrast": contrast * scale,
          "brightness": brightness * scale,
          "saturation": saturation * scale,
          "hue_shift": hue_shift * scale
        }
      ))
      await asyncio.sleep(TICK)

    self.cleanup()

  def cleanup(self):
    self.call(SetSourceFilterSettings(
      CAMERA_SOURCE,
      CAMERA_COLOR_FILTER,
      {
        "gamma": 0.0,
        "contrast": 0.0,
        "brightness": 0.0,
        "saturation": 0.0,
        "hue_shift": 0.0
      }
    ))
    self.thread = None
    return
