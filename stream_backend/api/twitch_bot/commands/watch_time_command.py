from asgiref.sync import sync_to_async
from datetime import datetime

from api.models import TwitchChatter
from api.twitch_bot.commands.base_command import BaseCommand
from api.utils.time_utils import human_readable

class WatchTimeCommand(BaseCommand):
  name = "watchtime"

  @sync_to_async
  def get_watch_time(self, username):
    try:
      chatter = TwitchChatter.objects.get(username=username)
      return human_readable(datetime.utcnow() - chatter.latest_join)
    except Exception:
      return None

  async def execute(self, context):
    watch_time = await self.get_watch_time(context.author.name)
    if watch_time is None:
      await context.send(f"@{context.author.name} no record of you *yet*.")
      return

    await context.send(f"@{context.author.name} {watch_time}")
