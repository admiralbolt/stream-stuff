import random

from api.twitch_bot.commands.base_command import BaseCommand

class EightBallCommand(BaseCommand):
  """Should I implement an 8ball command?

  All signs point to yes.
  """
  name = "8ball"

  responses = [
    "All signs point to yes.",
    "My sources say nope.",
    "Yes!",
    "You may rely on it.",
    "Outlook not so good...",
    "Outlook good.",
    "It is decidely so!",
    "Don't count on it.",
    "Reply hazy, try again.",
    "Better not tell you now.",
    "Yes, but only if you subscribe."
  ]

  async def execute(self, context):
    await context.send(f"@{context.author.name} {random.choice(self.responses)}")
    pass
