from api.twitch_bot.commands.base_command import BaseCommand

class LennyCommand(BaseCommand):
  name = "lenny"

  async def execute(self, context):
    await context.send("( ͡° ͜ʖ ͡°)")
