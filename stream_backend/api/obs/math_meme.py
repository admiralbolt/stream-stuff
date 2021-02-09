import asyncio
import random

from api.obs.base_script import BaseScript, CONSTANTS
from api.utils.websocket_client import WebSocketClient
from obswebsocket.requests import *

SCALE_INCREMENT = 0.08
THE_TWITCH_META = "Just Chatting"
MAX_EQUATION_NUM = 15


class MathMemeScript(BaseScript):

  def execute(self):
    asyncio.run(self.async_execute())

  async def async_execute(self):
    self.websocket_client = WebSocketClient(7004)
    await self.websocket_client.connect()

    # 1. Transition to the "just chatting" scene. This is a full screen view.
    self.transition_scene = self.call(GetCurrentScene()).getName()
    # I need both the preview and transition screens to be just chatting.
    self.call(SetCurrentScene(THE_TWITCH_META))
    self.call(SetCurrentScene(THE_TWITCH_META))

    # 2. Draw some math elements that move around randomly.
    for i in range(MAX_EQUATION_NUM + 1):
      await self.websocket_client.send({
        "type": "create",
        "id": f"equation_{i}",
        "html": f"<img src='/assets/images/eq{i}.png?v={random.random()}' />",
        "randomVelocity": True,
        "randomPosition": True,
        "timer": 5000
      })

    await asyncio.sleep(1)

    # 3. Zoom in the camera suddenly.
    self.initial_props = self.call(GetSceneItemProperties(CONSTANTS["CAMERA_SOURCE"], scene_name=THE_TWITCH_META))

    scale = {
      "x": self.initial_props.getScale()["x"],
      "y": self.initial_props.getScale()["y"]
    }
    crop = self.initial_props.getCrop()
    # The source sizes returned are UNSCALED!
    base_width = self.initial_props.getSourcewidth()
    base_height = self.initial_props.getSourceheight()
    initial_scaled_width = base_width * scale["x"]
    initial_scaled_height = base_height * scale["y"]

    # Set bounds to be the current size of the image.
    self.call(SetSceneItemProperties(
      CONSTANTS["CAMERA_SOURCE"],
      bounds={
        "type": "OBS_BOUNDS_STRETCH",
        "x": initial_scaled_width,
        "y": initial_scaled_height
      }
    ))

    for _ in range(7):
      scale["x"] = scale["x"] + SCALE_INCREMENT
      scale["y"] = scale["y"] + SCALE_INCREMENT

      # The size of the source ignoring cropping / rescaling.
      scaled_height = base_height * scale["y"]
      scaled_width = base_width * scale["x"]

      crop_vertical = (scaled_height - initial_scaled_height) // 2
      crop_horizontal = (scaled_width - initial_scaled_width) // 2

      self.call(SetSceneItemProperties(
        CONSTANTS["CAMERA_SOURCE"],
        scale=scale,
        crop={
          "top": crop_vertical,
          "bottom": crop_vertical,
          "left": crop_horizontal,
          "right": crop_horizontal
        }
      ))

      self.call(TransitionToProgram({
        "name": "Cut",
        "duration": 0
      }))

      await asyncio.sleep(0.001)

    await asyncio.sleep(2)
    await self.cleanup()

  async def cleanup(self):
    # Reset scale / crop if they exist.
    if self.initial_props is not None:
      self.call(SetSceneItemProperties(
        CONSTANTS["CAMERA_SOURCE"],
        scale=self.initial_props.getScale(),
        crop=self.initial_props.getCrop(),
        bounds={
          "type": "OBS_BOUNDS_NONE",
          "x": 0,
          "y": 0
        }
      ))
    self.call(SetCurrentScene(self.transition_scene))
    self.call(SetCurrentScene(self.transition_scene))
    self.call(TransitionToProgram({
      "name": "Cut",
      "duration": 0
    }))
    await asyncio.sleep(0.25)
    self.thread = None
