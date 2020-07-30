from twitchio.ext.commands import Command

class BaseCommand(Command):

  def __init__(self):
    super().__init__(self.name, self.execute)

  async def execute(self, context):
    """This should be overriden in the child"""
    pass
