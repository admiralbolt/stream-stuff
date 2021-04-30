import asyncio
import time

from obswebsocket.requests import *

from api.const import TWITCH_META_SCENE
from api.obs.base_script import BaseScript, CONSTANTS
from api.utils.websocket_client import WebSocketClient

TEXT_CSS = """
color: white;
font-family: "Snell";
font-size: 140px;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
margin-top: 500px;
"""

STAR_CSS = """
top: %s;
left: %s;
"""


class FilthyFrankFuckYouScript(BaseScript):
  websocket_client = None

  def execute(self):
    asyncio.run(self.async_execute())

  async def async_execute(self):
    self.websocket_client = WebSocketClient(7004)
    await self.websocket_client.connect()

    self.transition_scene = self.call(GetCurrentScene()).getName()
    self.call(SetCurrentScene(TWITCH_META_SCENE))
    self.call(SetSourceFilterSettings(CONSTANTS["CAMERA_SOURCE"], "Gray", {"clut_amount": 1.0}))
    self.call(SetSourceFilterSettings(CONSTANTS["BACKGROUND_IMAGE_SOURCE"], "Gray", {"clut_amount": 1.0}))

    for i in range(50):
      await self.websocket_client.send({
        "type": "create",
        "id": f"filthy-star-{i}",
        "html": f"<div class='shine' style='top: 440px; left: {i*2}%'></div>"
      })
      if i == 24:
        await self.websocket_client.send({
          "type": "create",
          "id": "filthy-text",
          "html": f"<div class='header'>Fuck You</div>"
        })
      await asyncio.sleep(0.03)

    await asyncio.sleep(1)
    await self.cleanup()
    return

  async def cleanup(self):
    self.call(SetCurrentScene(self.transition_scene))
    await self.websocket_client.send({
      "type": "delete",
      "id": "filthy-text"
    })
    for i in range(50):
      await self.websocket_client.send({
        "type": "delete",
        "id": f"filthy-star-{i}"
      })
    self.call(SetSourceFilterSettings(CONSTANTS["CAMERA_SOURCE"], "Gray", {"clut_amount": 0.0}))
    self.call(SetSourceFilterSettings(CONSTANTS["BACKGROUND_IMAGE_SOURCE"], "Gray", {"clut_amount": 0.0}))
    self.thread = None
    return
