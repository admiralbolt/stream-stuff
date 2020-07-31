import asyncio

from api.const import BRAIN_SIZE
from api.twitch_bot.commands.base_command import BaseCommand
from api.utils.key_value_utils import async_get_value, async_set_value

class SmallBrainCommand(BaseCommand):
  name = "smallBrain"
  lock = asyncio.Lock()

  async def atomic_adjust(self):
    async with self.lock:
      brain_size = await async_get_value(BRAIN_SIZE)
      await async_set_value(BRAIN_SIZE, brain_size - 1)

  async def execute(self, context):
    await self.atomic_adjust()
