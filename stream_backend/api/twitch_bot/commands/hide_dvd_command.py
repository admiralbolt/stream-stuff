import asyncio

from api.const import DVD_SHOW
from api.twitch_bot.commands.base_command import BaseCommand
from api.utils.key_value_utils import async_set_value

class HideDvdCommand(BaseCommand):
  """Show the dvd bounce."""
  name = "hidedvd"

  async def execute(self, context):
    await async_set_value(DVD_SHOW, False)
    await self.websockets.dvd_bounce.send({
      'showDvd': False
    })
