from asgiref.sync import sync_to_async

from api.models import Sound
from api.twitch_bot.commands.base_command import BaseCommand

class SoundBoardCommand(BaseCommand):
  name = "soundboard"

  @sync_to_async
  def get_sounds(self):
    return [sound.name for sound in Sound.objects.filter(private=False).order_by("name")]

  async def execute(self, context, page_number=1):
    all_sounds = await self.get_sounds()
    max_pages = (len(all_sounds) // 30) + 1
    formatted_sounds = " | ".join(all_sounds[(page_number - 1) * 30:page_number * 30])
    await context.send(f"Showing Page {page_number} / {max_pages} [{formatted_sounds}]")
