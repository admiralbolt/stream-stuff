import asyncio

from api.const import BACKGROUND_IMAGE_URL
from api.obs.base_script import BaseScript
from api.utils.key_value_utils import async_set_value
from api.utils.unsplash import get_random_photo_url
from api.utils.websocket_client import WebSocketClient

class RandomBackgroundScript(BaseScript):

  def execute(self):
    asyncio.run(self.async_execute())

  async def async_execute(self):
    self.websocket_client = WebSocketClient(7008)
    await self.websocket_client.connect()

    url = get_random_photo_url()
    if url:
      await async_set_value(BACKGROUND_IMAGE_URL, url)
      await self.websocket_client.send({"imageUrl": url})

    await self.cleanup()
    return

  async def cleanup(self):
    for i in range(20):
      for j in range(8):
        await self.websocket_client.send({
          "type": "delete",
          "id": f"error_{i}_{j}"
        })

    await self.websocket_client.send({
      "type": "delete",
      "id": f"blue_screen_of_death"
    })

    self.thread = None

    return
