from api.twitch_bot.commands.base_command import BaseCommand

class SudokuCommand(BaseCommand):
  name = "sudoku"

  async def execute(self, context):
    await context.timeout(context.author.name, 60, reason="You committed sudoku")
