from api.twitch_bot.commands.base_command import BaseCommand

INFO="""
You're beautiful, just as you are.
you might think you're just trash, or your faults are too much, but actually it just proves how strong you are, carrying all those faults and the fact that you're still here, running this race as you do is just so awesome actually. You go through so much and you're still running, carrying all those faults and burdens and you're still going on. You're so strong. You being the only you out of over 7 billion people doesn't make you small, actually it just makes each of us so much more precious, we can help each other in so many different ways, and maybe you fail all the time, but you're still here and maybe you've stopped running but your still here again proving how strong you are, how amazing you are, and you know it will be so worth it when you do succeed, you got this. You know you're shadows, for them to exist in the first place there needs to be a light, one just as big and as bright and wild and uncontrollable.
You can do this, i love you, remember you're so precious, so so so precious yes you and remember, you ARE beautiful just as you are.
Sorry this isn't related to anything up there. I love you, no matter who you are and you're beautiful just as you are.
"""


class InfoCommand(BaseCommand):
  name = "info"

  async def execute(self, context):
    await context.send(f"{INFO}")
