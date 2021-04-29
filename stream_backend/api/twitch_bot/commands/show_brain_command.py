import asyncio

from api.const import BRAIN_SHOW
from api.twitch_bot.commands.base_command import BaseCommand
from api.utils.key_value_utils import async_set_value

class ShowBrainCommand(BaseCommand):
  """Show dat brain boi."""
  name = "showbrain"

  async def execute(self, context):
    await async_set_value(BRAIN_SHOW, True)
    await self.websockets.brain.send({
      'showBrain': True
    })
