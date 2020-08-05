from twitchio.ext.commands import Command

class BaseCommand(Command):

  def __init__(self, websockets, twitch_service):
    super().__init__(self.name, self.execute)
    self.websockets = websockets
    self.twitch_service = twitch_service

  async def execute(self, context):
    """This should be overriden in the child"""
    pass
