from api.hardware.light_manager import COLOR_NAMES
from api.twitch_bot.commands.base_command import BaseCommand


class ColorsCommand(BaseCommand):
  name = "colors"

  async def execute(self, context):
    await context.send(" | ".join(COLOR_NAMES))
