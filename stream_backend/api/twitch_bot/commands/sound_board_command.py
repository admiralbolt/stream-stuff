from asgiref.sync import sync_to_async

from api.models import Sound
from api.twitch_bot.commands.base_command import BaseCommand

class SoundBoardCommand(BaseCommand):
  name = "soundboard"

  @sync_to_async
  def get_formatted_sounds(self):
    return " | ".join([sound.name for sound in Sound.objects.order_by("name")])

  async def execute(self, context):
    formatted_sounds = await self.get_formatted_sounds()
    await context.send(formatted_sounds)
