from api.twitch_bot.commands.base_command import BaseCommand

class DiscordCommand(BaseCommand):
  name = "discord"

  async def execute(self, context):
    await context.send(f"@{context.author.name} https://bit.ly/30huvbc")
