from api.twitch_bot.commands.base_command import BaseCommand

class SeppukuCommand(BaseCommand):
  name = "seppuku"

  async def execute(self, context):
    await context.send(f"@{context.author.name} https://www.sudokuweb.org/")
