from api.twitch_bot.commands.base_command import BaseCommand

class NiceCommand(BaseCommand):
  name = "69"

  async def execute(self, context):
    await context.send(f"@{context.author.name} nice")
