import asyncio
import base64
import time

from api import models
from api.obs.base_script import BaseScript, CONSTANTS
from api.utils.websocket_client import WebSocketClient

TILE_INCREMENT = 50
SPEEDUP = 0.08
ERROR_SOUND = models.Sound.objects.get(name="Windows XP Error")

class WindowsErrorScript(BaseScript):

  loop = None

  def execute(self):
    self.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(self.loop)
    self.websocket_client = WebSocketClient(7004)
    self.loop.run_until_complete(self.websocket_client.connect())

    sleep_time = 0.8
    for j in range(8):
      for i in range(20):
        x = -750 + j * 350 + TILE_INCREMENT * i
        y = -20 + TILE_INCREMENT * i
        if x < -150 or x > 1920 or y > 1080:
          continue

        self.loop.run_until_complete(self.websocket_client.send({
          "type": "create",
          "id": f"error_{i}_{j}",
          "html": f"<img src='/assets/images/windows_error.png' />",
          "position": {
            "x": x,
            "y": y
          }
        }))

        self.sound_manager.play_sound(
          ERROR_SOUND.sound_file.path,
          sound_name=ERROR_SOUND.name,
          play_multiple=True,
          headphone=True,
          stream=True
        )

        time.sleep(sleep_time)
        sleep_time = max(0.01, sleep_time - SPEEDUP)

    self.loop.run_until_complete(self.websocket_client.send({
      "type": "create",
      "id": f"blue_screen_of_death",
      "html": f"<img src='/assets/images/death.jpg' />"
    }))

    time.sleep(4)
    self.cleanup()
    return

  def cleanup(self):
    for i in range(20):
      for j in range(8):
        self.loop.run_until_complete(self.websocket_client.send({
          "type": "delete",
          "id": f"error_{i}_{j}"
        }))

    self.loop.run_until_complete(self.websocket_client.send({
      "type": "delete",
      "id": f"blue_screen_of_death"
    }))

    self.loop.stop()
    self.loop.close()
    self.thread = None

    return
