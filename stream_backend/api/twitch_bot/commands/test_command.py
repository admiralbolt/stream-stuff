from api.twitch_bot.commands.base_command import BaseCommand

class TestCommand(BaseCommand):
  name = "test"

  async def execute(self, context):
    pass
