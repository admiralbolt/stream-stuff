from api.sound_utils import SoundPlayer
from django.apps import AppConfig

import keyboard
import threading

CABLE_0 = "CABLE Input (VB-Audio Virtual C"
CABLE_A = "CABLE-A Input (VB-Audio Cable A"
CABLE_B = "CABLE-B Input (VB-Audio Cable B"

class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
      self.mic_sound_player = SoundPlayer(input_name=CABLE_0)
      self.headphone_sound_player = SoundPlayer(input_name=CABLE_A)
      from api import models
      sounds = models.Sound.objects.order_by("id")
      for i, sound in enumerate(sounds):
        keybind = ", ".join(str(i))
        keyboard.add_hotkey(f"ctrl+shift+alt+{keybind}", self.play_sound, args=(sound.id,))


    def threaded_play_sound(self, sound_player, sound):
      sound_player.play_sound(sound)

    def play_sound(self, sound_id):
      from api import models
      sound = models.Sound.objects.get(id=sound_id)
      if not sound: return

      t = threading.Thread(target=self.threaded_play_sound, args=[self.mic_sound_player, sound])
      t.setDaemon(True)
      t.start()

      t2 = threading.Thread(target=self.threaded_play_sound, args=[self.headphone_sound_player, sound])
      t2.setDaemon(True)
      t2.start()
