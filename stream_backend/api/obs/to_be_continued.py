import asyncio
import base64
import os
import time

import cv2
from obswebsocket.requests import *

from api import models
from api.obs.base_script import BaseScript, CONSTANTS
from api.utils import image_helpers
from api.utils.websocket_client import WebSocketClient

SOUND_MODEL = models.Sound.objects.get(name="Roundabout")

class ToBeContinuedScript(BaseScript):

  loop = None
  websocket_client = None

  def execute(self):
    self.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(self.loop)
    self.websocket_client = WebSocketClient(7004)
    self.loop.run_until_complete(self.websocket_client.connect())

    self.call(SetMute(CONSTANTS["DESKTOP_AUDIO_SOURCE"], True))

    self.sound_manager.play_sound(
      SOUND_MODEL.sound_file.path,
      sound_name=SOUND_MODEL.name,
      stream=True,
      headphone=True
    )

    total_time = 44
    # Get this timing right, good luck.
    while not self.thread.stopped() and total_time > 0:
      time.sleep(1)
      total_time -= 1

    if self.thread.stopped():
      self.cleanup()
      return

    latest_frame = self.client.get_latest_frame()
    blurred_frame = image_helpers.blur(latest_frame, kernel_size=21)
    sharpened_frame = cv2.addWeighted(latest_frame, 1.5, blurred_frame, -0.5, 0)

    filter = cv2.imread("api\\obs\\images\\speed_lines_filter.jpg")
    final = cv2.addWeighted(sharpened_frame, 0.9, filter, 0.1, 0)

    retval, buffer = cv2.imencode('.png', final)
    img_data = base64.b64encode(buffer).decode()

    self.loop.run_until_complete(self.websocket_client.send({
      "type": "create",
      "id": "to_be_continued_frame",
      "html": f"<img src='data:image/png;base64,{img_data}' />",
    }))

    self.loop.run_until_complete(self.websocket_client.send({
      "type": "create",
      "id": "to_be_continued_arrow",
      "html": f"<img src='/assets/images/to_be_continued.png' />",
      "position": {
        "x": 200,
        "y": 800
      }
    }))

    self.call(SetMute(CONSTANTS["MIC_SOURCE"], True))

    total_time = 300
    while not self.thread.stopped() and total_time > 0:
      time.sleep(1)
      total_time -= 1

    self.cleanup()
    return

  def cleanup(self):
    self.sound_manager.stop_sound(
      SOUND_MODEL.name,
      stream=True,
      headphone=True
    )

    self.call(SetMute(CONSTANTS["DESKTOP_AUDIO_SOURCE"], False))
    self.call(SetMute(CONSTANTS["MIC_SOURCE"], False))

    self.loop.run_until_complete(self.websocket_client.send({
      "type": "delete",
      "id": "to_be_continued_frame"
    }))

    self.loop.run_until_complete(self.websocket_client.send({
      "type": "delete",
      "id": "to_be_continued_arrow"
    }))

    self.loop.stop()
    self.loop.close()
    self.thread = None
    return
