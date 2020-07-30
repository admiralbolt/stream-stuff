from importlib import import_module
import os
import threading

from asgiref.sync import sync_to_async
from django.apps import AppConfig
import keyboard
import obswebsocket

from api.obs.obs_client import OBSClient
from api.bot.admiral_lightning_bot import BotManager
from api.utils.poll_manager import PollManager
from api.utils.sound_manager import SoundManager
from api.utils.stoppable_thread import StoppableThread
from api.utils.voice_manager import VoiceManager
from api.utils.twitch_client import TwitchClient

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
      from api.utils.key_value_utils import get_value

      # Setup sound
      self.sound_manager = SoundManager()
      sounds = models.Sound.objects.order_by("id")
      print("SOUNDBOARD KEYBINDINGS")
      print("======================")
      for i, sound in enumerate(sounds):
        print(f"{get_keybind(i)}, {sound.name}")
        keyboard.add_hotkey(get_keybind(i), self.play_sound, args=(sound.name,))
        keyboard.add_hotkey(f"{get_keybind(i)}+q", self.stop_sound, args=(sound.name,))


      self.scripts = {}
      # Setup obs websocket
      self.client = OBSClient()
      print("SCRIPT KEYBINDINGS")
      print("==================")
      for i, script in enumerate(models.Script.objects.order_by("id")):
        ScriptClass = import_script(f"api.obs.{script.script_name}")
        self.scripts[script.script_name] = ScriptClass(self.client, self.sound_manager)
        print(f"ctrl+alt+s+{i}: {script.script_name}")
        keyboard.add_hotkey(f"ctrl+alt+s+{i}", self.run_script, args=(script.script_name, False))
        keyboard.add_hotkey(f"ctrl+alt+s+q+{i}", self.run_script, args=(script.script_name, True))

      # VOICE MANAGER
      # self.voice_manager = VoiceManager(self.sound_manager)
      # self.voice_manager.start_listening()

      # POLLS
      self.poll_manager = PollManager()

      self.bot_manager = BotManager()
      self.bot_manager.start()

    def run_script(self, script_name, stop=False):
      if stop:
        self.scripts[script_name].stop()
      else:
        self.scripts[script_name].start()


    def play_sound(self, sound_name):
      from api import models

      sound = models.Sound.objects.get(name=sound_name)
      self.sound_manager.play_sound(sound.sound_file.path, sound_name=sound.name, mic=True, headphone=True)

    def stop_sound(self, sound_name):
      self.sound_manager.stop_sound(sound_name, mic=True, headphone=True)
