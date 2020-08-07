from datetime import datetime

from api.const import LOCAL_TIMEZONE
from api.twitch_bot.commands.base_command import BaseCommand

class LocalTimeCommand(BaseCommand):
  name = "localtime"

  async def execute(self, context):
    nice_date = datetime.now(LOCAL_TIMEZONE).strftime("%c")
    await context.send(f"Avi's Local Time is {nice_date}") 
