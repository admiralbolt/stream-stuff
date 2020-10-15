from api.const import BRACKET_LINK
from api.twitch_bot.commands.base_command import BaseCommand
from api.utils.key_value_utils import async_get_value, async_set_value

class BracketCommand(BaseCommand):
  """Spits out the bracket."""
  name = "bracket"

  async def execute(self, context):
    bracket_link = await async_get_value(BRACKET_LINK)
    await context.send(bracket_link)
