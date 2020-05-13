from api.sound_utils import SoundPlayer
from django.apps import AppConfig

CABLE_0 = "CABLE Input (VB-Audio Virtual C"
CABLE_A = "CABLE-A Input (VB-Audio Cable A"
CABLE_B = "CABLE-B Input (VB-Audio Cable B"

class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
      self.mic_sound_player = SoundPlayer(input_name=CABLE_0)
      self.headphone_sound_player = SoundPlayer(input_name=CABLE_A)
