import asyncio

from api import models
from api.obs.base_script import BaseScript

TORNADO_SIREN = models.Sound.objects.get(name="Tornado Siren")

class RedAlertScript(BaseScript):

  loop = None

  def execute(self):
    asyncio.run(self.async_execute())

  async def async_execute(self):
    self.sound_manager.play_sound(
      TORNADO_SIREN.sound_file.path,
      sound_name=TORNADO_SIREN.name,
      play_multiple=False,
      headphone=True,
      stream=True
    )

    self.light_manager.set_waveform(6500, 65535, 65535, 3500, period=500, cycles=12, duty_cycle=0, waveform=4)
    await asyncio.sleep(6.1)
    self.light_manager.set_waveform(6500, 65535, 65535, 3500, period=600, cycles=2, duty_cycle=0, waveform=4)
    await asyncio.sleep(1.3)
    self.light_manager.set_waveform(6500, 65535, 65535, 3500, period=700, cycles=2, duty_cycle=0, waveform=4)
    await asyncio.sleep(1.5)
    self.light_manager.set_waveform(6500, 65535, 65535, 3500, period=800, cycles=2, duty_cycle=0, waveform=4)
    await asyncio.sleep(1.7)
    await asyncio.sleep(1.5)

    await self.cleanup()
    return

  async def cleanup(self):
    self.sound_manager.stop_sound(
      TORNADO_SIREN.name,
      headphone=True,
      stream=True
    )

    await asyncio.sleep(1)
    self.thread = None
    return
