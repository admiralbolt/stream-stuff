from twitchio.ext.commands import Command

class BaseCommand(Command):

  def __init__(self, websockets):
    super().__init__(self.name, self.execute)
    self.websockets = websockets

  async def execute(self, context):
    """This should be overriden in the child"""
    pass
