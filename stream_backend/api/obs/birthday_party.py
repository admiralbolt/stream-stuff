import asyncio
import random

from api import models
from api.obs.base_script import BaseScript, CONSTANTS
from api.utils.websocket_client import WebSocketClient

GRUNT_BIRTHDAY_PARTY = models.Sound.objects.get(name="Grunt Birthday Party")

COLORS = ["#eeaf00", "#3646b2", "#39aa50", "#eaea11"]
TEMPLATE_CSS = """
width: 15px;
height: 5px;
top: -10%%;
transform: rotate(%sdeg);
background-color: %s;
"""

class BirthdayPartyScript(BaseScript):

  loop = None

  def execute(self):
    asyncio.run(self.async_execute())

  async def async_execute(self):
    self.websocket_client = WebSocketClient(7004)
    await self.websocket_client.connect()

    self.sound_manager.play_sound(
      GRUNT_BIRTHDAY_PARTY.sound_file.path,
      sound_name=GRUNT_BIRTHDAY_PARTY.name,
      play_multiple=False,
      headphone=True,
      stream=True
    )

    for i in range(50):
      x = (i * 343) % 1920
      y = random.randint(-50, 50)
      vx = random.random() + random.random()
      vy = random.randint(5, 11) + random.random() + random.random()
      color = COLORS[i % 4]
      css = TEMPLATE_CSS % (random.randint(1, 360), color)

      await self.websocket_client.send({
        "type": "create",
        "id": f"confetti_{i}",
        "html": f"<div style='{css}'></div>",
        "position": {
          "x": x,
          "y": y
        },
        # Ensure that the confetti stays on screen until it drifts all the
        # way off.
        "timer": (((1080 - y) / vy) + 3) * CONSTANTS["CANVAS_TICK"],
        "timerOpacity": False,
        "velocity": {
          "x": vx,
          "y": vy
        }
      })

      await asyncio.sleep(0.015)


    await asyncio.sleep(2.5)
    await self.cleanup()
    return

  async def cleanup(self):
    self.sound_manager.stop_sound(
      GRUNT_BIRTHDAY_PARTY.name,
      headphone=True,
      stream=True
    )

    await asyncio.sleep(0.1)
    self.thread = None
    return
