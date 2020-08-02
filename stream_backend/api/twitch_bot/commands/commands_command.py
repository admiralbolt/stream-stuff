from api.twitch_bot.commands.base_command import BaseCommand

class CommandsCommand(BaseCommand):
  """Spit out all dem commands yo."""

  name = "commands"

  def __init__(self, websockets, command_names):
    super().__init__(websockets)
    self.command_response = "Commands: !" + " !".join(sorted(command_names))

  async def execute(self, context):
    await context.send(self.command_response)
