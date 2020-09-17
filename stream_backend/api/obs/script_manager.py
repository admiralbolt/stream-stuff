import keyboard
import os

from asgiref.sync import sync_to_async
from importlib import import_module

from api.const import SCRIPT_PAGE
from api.models import Script
from api.utils.key_value_utils import get_value, set_value

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

  def __init__(self, obs_client, sound_manager, light_manager):
    self.scripts = {}
    self.obs_client = obs_client
    self.sound_manager = sound_manager
    self.light_manager = light_manager

  @sync_to_async
  def initialize(self):
    for i, script in enumerate(Script.objects.order_by("id")):
      ScriptClass = import_script(f"api.obs.{script.script_name}")
      self.scripts[script.script_name] = ScriptClass(self.obs_client, self.sound_manager, self.light_manager)

  @sync_to_async
  def setup_keybindings(self):
    keyboard.add_hotkey("ctrl+alt+shift+\"", self.increment_page, args=(True,))
    keyboard.add_hotkey("ctrl+alt+shift+:", self.increment_page, args=(False,))

    for i in range(9):
      keyboard.add_hotkey(f"ctrl+alt+shift+s+{i}", self.run_paginated_script, args=(i,))

  def increment_page(self, positive=True):
    """Increments the current page value.

    We need to make sure to reset to 0 when we have no valid keybindings anymore.
    I.e. We have 37 keybindings and the page is set to 4. A page set to 4 implies
    a +40 to the index value aka we would never hit a valid keybinding.
    """
    max_page = (Script.objects.count() - 1) // 9
    page = get_value(SCRIPT_PAGE) + (1 if positive else -1)
    if page < 0:
      page = max_page
    elif page > max_page:
      page = 0
    set_value(SCRIPT_PAGE, page)

  def run_paginated_script(self, base_index):
    page = get_value(SCRIPT_PAGE)
    index = page * 9 + base_index
    if index >= Script.objects.count():
      return

    script = Script.objects.order_by("id")[index]
    self.run_or_stop_script(script.script_name)

  def run_or_stop_script(self, script_name):
    if self.scripts[script_name].thread is None:
      self.scripts[script_name].start()
    else:
      self.scripts[script_name].stop()

  def run_script(self, script_name, stop=False):
    if stop:
      self.scripts[script_name].stop()
    else:
      self.scripts[script_name].start()

  def run_and_wait(self, script_name):
    self.scripts[script_name].start()
    self.scripts[script_name].thread.join()
    return
