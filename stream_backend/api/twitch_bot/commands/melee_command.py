from api.twitch_bot.commands.base_command import BaseCommand


class MeleeCommand(BaseCommand):
  name = "melee"

  async def execute(self, context):
    await context.send("ADMI#105")
