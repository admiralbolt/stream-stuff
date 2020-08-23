import keyboard
import os

from asgiref.sync import sync_to_async
from importlib import import_module

from api.models import Script

def import_script(script_path):
  """Dynamically import a script class from a path."""
  module_object = import_module(script_path)
  script_name = script_path.split(".")[-1]
  titleized_script = "".join([word.title() for word in script_name.split("_")])

  class_name = f"{titleized_script}Script"
  return getattr(module_object, class_name)

class ScriptManager:
  """Loads scripts & their keybindings.

  Nothing really interesting here, just some extra abstraction
  for cleanliness and to keep the ready() function in apps.py
  from getting absurd.
  """

  def __init__(self, obs_client, sound_manager):
    self.scripts = {}
    self.obs_client = obs_client
    self.sound_manager = sound_manager
    pass

  @sync_to_async
  def initialize(self):
    for i, script in enumerate(Script.objects.order_by("id")):
      ScriptClass = import_script(f"api.obs.{script.script_name}")
      self.scripts[script.script_name] = ScriptClass(self.obs_client, self.sound_manager)

  @sync_to_async
  def setup_keybindings(self):
    print("SCRIPT KEYBINDINGS")
    print("==================")
    for i, script in enumerate(Script.objects.order_by("id")):
      print(f"ctrl+alt+s+{i}: {script.script_name}")
      keyboard.add_hotkey(f"ctrl+alt+s+{i}", self.run_script, args=(script.script_name, False))
      keyboard.add_hotkey(f"ctrl+alt+s+q+{i}", self.run_script, args=(script.script_name, True))

  def run_script(self, script_name, stop=False):
    if stop:
      self.scripts[script_name].stop()
    else:
      self.scripts[script_name].start()

  def run_and_wait(self, script_name):
    self.scripts[script_name].start()
    self.scripts[script_name].thread.join()
    return
