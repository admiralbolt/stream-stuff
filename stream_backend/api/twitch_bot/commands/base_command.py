from twitchio.ext.commands import Command

from api.utils.twitch_client import TwitchClient

class BaseCommand(Command):

  def __init__(self, websockets):
    super().__init__(self.name, self.execute)
    self.websockets = websockets
    self.twitch_client = TwitchClient()

  async def execute(self, context):
    """This should be overriden in the child"""
    pass
