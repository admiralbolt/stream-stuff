import asyncio

from api.const import BRAIN_SHOW
from api.twitch_bot.commands.base_command import BaseCommand
from api.utils.key_value_utils import async_set_value

class HideBrainCommand(BaseCommand):
  """Hide dat brain boi."""
  name = "hidebrain"

  async def execute(self, context):
    await async_set_value(BRAIN_SHOW, False)
    await self.websockets.brain.send({
      'showBrain': False
    })
