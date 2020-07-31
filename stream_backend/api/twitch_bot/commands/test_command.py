from api.twitch_bot.commands.base_command import BaseCommand

class TestCommand(BaseCommand):
  name = "test"

  async def execute(self, context):
    await context.send(f"Hello {context.author.name}!")
