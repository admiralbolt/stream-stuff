import asyncio
import base64
import json
import os
import time

import cv2
from api import models
from obswebsocket.requests import *

from api.obs.base_script import BaseScript, CONSTANTS
from api.utils import image_helpers
from api.utils.websocket_client import WebSocketClient

SOUND_MODEL = models.Sound.objects.get(name="We'll Be Right Back")

TEXT_CSS = """
color: white;
font-size: 84px;
position: absolute;
z-index: 10;
top: 500px;
left: 150px;
font-weight: bold;
-webkit-text-stroke: 3px black;
font-family: "Helvetica";
width: 50px;
"""


class WellBeRightBackScript(BaseScript):

  loop = None
  websocket_client = None

  def execute(self):
    asyncio.run(self.async_execute())

  async def async_execute(self):
    latest_frame = self.client.get_latest_frame()

    sepia_frame = image_helpers.sepia_filter(latest_frame)
    mixed_frame = cv2.addWeighted(latest_frame, 0.4, sepia_frame, 0.6, 0)
    blurred_frame = image_helpers.blur(mixed_frame, kernel_size=21)
    retval, buffer = cv2.imencode('.png', blurred_frame)
    img_data = base64.b64encode(buffer).decode()

    self.websocket_client = WebSocketClient(7004)
    await self.websocket_client.connect()

    await self.websocket_client.send({
      "type": "create",
      "id": "freeze-frame",
      "html": f"<img id='freeze-frame' src='data:image/png;base64,{img_data}' />",
    })

    await self.websocket_client.send({
      "type": "create",
      "id": "text",
      "html": f"<h1 id='text' style='{TEXT_CSS}'>We'll Be Right Back</h1>"
    })

    self.call(SetMute(CONSTANTS["DESKTOP_AUDIO_SOURCE"], True))
    self.call(SetMute(CONSTANTS["MIC_SOURCE"], True))

    self.sound_manager.play_sound(
      SOUND_MODEL.sound_file.path,
      sound_name=SOUND_MODEL.name,
      mic=True,
      stream=True,
      headphone=True
    )

    await asyncio.sleep(3)

    await self.cleanup()
    return

  async def cleanup(self):
    if self.websocket_client is not None:
      await self.websocket_client.send({
        "type": "delete",
        "id": "text"
      })

      await self.websocket_client.send({
        "type": "delete",
        "id": "freeze-frame"
      })

      await self.websocket_client.close()

    self.call(SetMute(CONSTANTS["DESKTOP_AUDIO_SOURCE"], False))
    self.call(SetMute(CONSTANTS["MIC_SOURCE"], False))

    self.sound_manager.stop_sound(
      SOUND_MODEL.name,
      mic=True,
      stream=True,
      headphone=True
    )

    self.thread = None
    return
