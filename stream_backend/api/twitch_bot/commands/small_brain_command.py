import asyncio

from api.const import BRAIN_SIZE
from api.twitch_bot.commands.base_command import BaseCommand
from api.utils.key_value_utils import async_get_value, async_set_value

class SmallBrainCommand(BaseCommand):
  """Decreases the size of the brain.

  Should be used when I'm a dumbass, which happens pretty
  frequently.
  """
  name = "smallBrain"

  async def atomic_adjust(self):
    async with self.lock:
      brain_size = await async_get_value(BRAIN_SIZE)
      await async_set_value(BRAIN_SIZE, brain_size - 1)
      await self.websockets.brain.send({
        "brainSize": brain_size - 1
      })

  async def execute(self, context):
    await self.atomic_adjust()
