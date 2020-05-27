import asyncio
import base64
import json
import os
import time

import cv2
import websockets
from api import models
from obswebsocket.requests import *

from api.obs.base_script import BaseScript, CONSTANTS
from api.utils import image_helpers

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


async def connect(future):
  socket = await websockets.connect("ws://localhost:7004")
  future.set_result(socket)

async def close(socket):
  await socket.close()

async def send(socket, data):
  await socket.send(json.dumps(data))


class WellBeRightBackScript(BaseScript):

  def execute(self):
    latest_recording = image_helpers.get_latest_recording()
    self.call(StartRecording())
    result = self.call(StopRecording())
    while not result.status:
      result = self.call(StopRecording())

    # Wait until latest recording file gets written.
    for i in range(20):
      if image_helpers.get_latest_recording() != latest_recording:
        break

      if i == 19:
        print("Recording timeout, exiting.")
        self.cleanup()
        return

      time.sleep(0.025)

    # Wait until latest frame gets loaded.
    latest_frame = image_helpers.get_latest_frame()
    while latest_frame is None:
      latest_frame = image_helpers.get_latest_frame()

    sepia_frame = image_helpers.sepia_filter(latest_frame)
    mixed_frame = cv2.addWeighted(latest_frame, 0.4, sepia_frame, 0.6, 0)
    blurred_frame = image_helpers.blur(mixed_frame, kernel_size=21)
    retval, buffer = cv2.imencode('.png', blurred_frame)
    img_data = base64.b64encode(buffer).decode()
    cv2.imwrite("C:\\Users\\avikn\\Videos\\blurred.png", blurred_frame)

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    future = asyncio.Future()
    loop.run_until_complete(connect(future))

    socket = future.result()

    loop.run_until_complete(send(socket, {
      "type": "create",
      "id": "freeze-frame",
      "html": f"<img id='freeze-frame' src='data:image/png;base64,{img_data}' />",
    }))

    loop.run_until_complete(send(socket, {
      "type": "create",
      "id": "text",
      "html": f"<h1 id='text' style='{TEXT_CSS}'>We'll Be Right Back</h1>"
    }))

    loop.run_until_complete(close(socket))

    loop.stop()
    loop.close()

    self.call(SetMute(CONSTANTS["DESKTOP_AUDIO_SOURCE"], True))
    self.call(SetMute(CONSTANTS["MIC_SOURCE"], True))

    self.mic_sound_player.play_sound(SOUND_MODEL)
    self.headphone_sound_player.play_sound(SOUND_MODEL)
    self.stream_sound_player.play_sound(SOUND_MODEL)

    time.sleep(3)

    self.cleanup()
    return

  def cleanup(self):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    future = asyncio.Future()
    loop.run_until_complete(connect(future))
    socket = future.result()

    loop.run_until_complete(send(socket, {
      "type": "delete",
      "id": "freeze-frame"
    }))

    loop.run_until_complete(send(socket, {
      "type": "delete",
      "id": "text"
    }))

    loop.run_until_complete(close(socket))
    loop.stop()
    loop.close()

    self.call(SetMute(CONSTANTS["DESKTOP_AUDIO_SOURCE"], False))
    self.call(SetMute(CONSTANTS["MIC_SOURCE"], False))

    self.mic_sound_player.stop_sound(SOUND_MODEL)
    self.headphone_sound_player.stop_sound(SOUND_MODEL)
    self.stream_sound_player.stop_sound(SOUND_MODEL)
    self.thread = None
    return
