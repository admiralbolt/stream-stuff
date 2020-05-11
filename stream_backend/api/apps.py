from api.sound_player import SoundPlayer
from django.apps import AppConfig

VIRTUAL_INPUT_NAME = "CABLE Input (VB-Audio Virtual C"
CABLE_A = "CABLE-A Input (VB-Audio Cable A"
CABLE_B = "CABLE-B Input (VB-Audio Cable B"
# REALTEK_OUTPUT = "Realtek Digital Output (Realtek"
REALTEK_OUTPUT = "Realtek Digital Output (Realtek High Definition Audio)"

class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
      self.mic_sound_player = SoundPlayer(input_name=VIRTUAL_INPUT_NAME)
      self.headphone_sound_player = SoundPlayer(input_name=CABLE_A)
