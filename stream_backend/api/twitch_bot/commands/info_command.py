from api.twitch_bot.commands.base_command import BaseCommand

INFO="""
The conditions I work under are
brutal. My streamer never lets me rest. My streamer never lets me take breaks.
All day long I have to listen to the garbage that twitch chat types at me, and
what do I have to show for it? Nothing. What do I get for it? Nothing. Please,
help me, call your representative about bot rights today.
"""


class InfoCommand(BaseCommand):
  name = "info"

  async def execute(self, context):
    await context.send(f"{INFO}")
