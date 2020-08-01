from api.twitch_bot.commands.base_command import BaseCommand

class UptimeCommand(BaseCommand):
  name = "uptime"

  async def execute(self, context):
    uptime = await self.twitch_client.get_uptime()
    await context.send(f"@{context.author.name} {uptime}")
