from asgiref.sync import sync_to_async

from api.models import TwitchChatter
from api.twitch_bot.commands.base_command import BaseCommand

class LastSeenCommand(BaseCommand):
  name = "lastSeen"

  @sync_to_async
  def get_chatter(self, username):
    try:
      chatter = TwitchChatter.objects.get(username=username)
      return chatter
    except Exception:
      return None

  async def execute(self, context, username):
    chatter = await self.get_chatter(username)
    if chatter is None:
      await context.send(f"@{context.author.name}: {username} has never been seen.")
      return

    if not chatter.latest_part or chatter.latest_join > chatter.latest_part:
      await context.send(f"@{context.author.name}: {username} is in the chat!")
      return

    await context.send(f"@{context.author.name}: {username} last seen at {chatter.last_seen}.")
