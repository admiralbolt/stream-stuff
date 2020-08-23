import asyncio
import random

from api.obs.base_script import BaseScript, CONSTANTS
from api.utils.websocket_client import WebSocketClient
from obswebsocket.requests import *

DIV_CSS = """
background-image: linear-gradient(to right, rgba(255, 0, 255, 1), rgba(255, 0, 255, 0));
height: 150px;
width: 600px;
padding-left: 100px;
display: flex;
z-index: 10;
"""

TEXT_CSS = """
font-family: Tahoma, Geneva, sans-serif;
color: white;
font-weight: 500;
font-size: 84px;
-webkit-text-stroke: 1px black;
text-shadow: 3px 3px #000000;
white-space: nowrap;
margin: auto;
"""

STYLE = """
<style>
.scene {
  width: 600px;
  height: 600px;
  perspective: 1200px;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-300px) rotateY(45deg);
}

.cube-face {
  position: absolute;
  width: 600px;
  height: 600px;
}

.front { transform: rotateY(0deg) translateZ(300px); background: rgba(120, 120, 120, 1); }
.right { transform: rotateY(90deg) translateZ(300px); background: rgba(150, 150, 150, 1); }
.back { transform: rotateY(180deg) translateZ(300px); background: rgba(150, 150, 150, 1); }
.left { transform: rotateY(-90deg) translateZ(300px); background: rgba(150, 150, 150, 1); }
.top { transform: rotateX(90deg) translateZ(300px); background: rgba(150, 150, 150, 1); }
.bottom { transform: rotateX(-90deg) translateZ(300px); background: rgba(0, 0, 0, 0); }

</style>
"""

SHAME_CUBE = """
<div class="scene">
  <div class="cube">
    <div class="cube-face front"></div>
    <div class="cube-face back"></div>
    <div class="cube-face right"></div>
    <div class="cube-face left"></div>
    <div class="cube-face top"></div>
    <div class="cube-face bottom"></div>
  </div>
</div>
"""

class ShameCubeScript(BaseScript):

  loop = None
  transition_scene = None

  def execute(self):
    asyncio.run(self.async_execute())

  async def async_execute(self):
    self.websocket_client = WebSocketClient(7004)
    await self.websocket_client.connect()


    await self.websocket_client.send({
      "type": "create",
      "id": f"shame_cube_text",
      "html": f"<div style='{DIV_CSS}'><span style='{TEXT_CSS}'>SHAME CUBE</span></div>",
      "position": {
        "x": 0,
        "y": 800
      }
    })

    await self.websocket_client.send({
      "type": "create",
      "id": f"shame_cube_style",
      "html": STYLE
    })

    start = -600
    end = (1080 * (2/3)) - 600 / 2
    timer = 5000
    await self.websocket_client.send({
      "type": "create",
      "id": f"shame_cube_cube",
      "html": SHAME_CUBE,
      "position": {
        "x": 960 - 600 / 2,
        "y": start
      },
      "velocity": {
        "x": 0,
        "y": (end - start) / (timer / CONSTANTS["CANVAS_TICK"])
      },
      "timer": timer,
      "timerOpacity": False,
      "deleteOnTimeout": False
    })

    self.transition_scene = self.call(GetCurrentScene()).getName()
    self.call(SetCurrentScene("Shame Cube"))

    await asyncio.sleep(3 + timer / 1000)
    await self.cleanup()
    return

  async def cleanup(self):
    await self.websocket_client.send({
      "type": "delete",
      "id": f"shame_cube_text"
    })
    await self.websocket_client.send({
      "type": "delete",
      "id": f"shame_cube_style"
    })
    await self.websocket_client.send({
      "type": "delete",
      "id": f"shame_cube_cube"
    })
    self.call(SetCurrentScene(self.transition_scene))
    await asyncio.sleep(0.25)
    self.thread = None
    return
