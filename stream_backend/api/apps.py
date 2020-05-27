from api.utils.sound_player import SoundPlayer
from django.apps import AppConfig
from api.obs.obs_client import OBSClient
from importlib import import_module

import keyboard
import obswebsocket
import os
import threading

CABLE_0 = "CABLE Input (VB-Audio Virtual C"
CABLE_A = "CABLE-A Input (VB-Audio Cable A"
CABLE_B = "CABLE-B Input (VB-Audio Cable B"

def get_keybind(index):
  modifier = ""
  if index >= 30:
    modifier = "+z+x"
  elif index >= 20:
    modifier = "+x"
  elif index >= 10:
    modifier = "+z"
  return f"ctrl+shift+alt+{index % 10}" + modifier

def import_script(script_path):
  module_object = import_module(script_path)
  script_name = script_path.split(".")[-1]
  titleized_script = "".join([word.title() for word in script_name.split("_")])

  class_name = f"{titleized_script}Script"
  return getattr(module_object, class_name)

class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
      if os.environ.get('RUN_MAIN', None) != 'true':
        return

      from api import models

      # Setup sound
      self.mic_sound_player = SoundPlayer(input_name=CABLE_0)
      self.headphone_sound_player = SoundPlayer(input_name=CABLE_A)
      self.stream_sound_player = SoundPlayer(input_name=CABLE_B)
      sounds = models.Sound.objects.order_by("id")
      print("SOUNDBOARD KEYBINDINGS")
      print("======================")
      for i, sound in enumerate(sounds):
        print(f"{get_keybind(i)}, {sound.name}")
        keyboard.add_hotkey(get_keybind(i), self.play_sound, args=(sound,))
        keyboard.add_hotkey(f"{get_keybind(i)}+q", self.stop_sound, args=(sound,))


      self.scripts = {}
      # Setup obs websocket
      self.client = OBSClient(obswebsocket.obsws("localhost", 4444))
      print("SCRIPT KEYBINDINGS")
      print("==================")
      for i, script in enumerate(models.Script.objects.order_by("id")):
        ScriptClass = import_script(f"api.obs.{script.script_name}")
        self.scripts[script.script_name] = ScriptClass(self.client, self.mic_sound_player, self.headphone_sound_player, self.stream_sound_player)
        print(f"ctrl+alt+s+{i}: {script.script_name}")
        keyboard.add_hotkey(f"ctrl+alt+s+{i}", self.run_script, args=(script.script_name, False))
        keyboard.add_hotkey(f"ctrl+alt+s+q+{i}", self.run_script, args=(script.script_name, True))


    def run_script(self, script_name, stop=False):
      if stop:
        self.scripts[script_name].stop()
      else:
        self.scripts[script_name].start()


    def play_sound(self, sound):
      self.mic_sound_player.play_sound(sound)
      self.headphone_sound_player.play_sound(sound)

    def stop_sound(self, sound):
      self.mic_sound_player.stop_sound(sound)
      self.headphone_sound_player.stop_sound(sound)
