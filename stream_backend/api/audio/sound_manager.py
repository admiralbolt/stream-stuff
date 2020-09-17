import keyboard

from asgiref.sync import sync_to_async

from api.audio.sound_player import SoundPlayer
from api.const import KEYBINDING_PAGE
from api.models import Sound
from api.utils.key_value_utils import get_value, set_value

class SoundManager:
  """A class for playing sounds to many different locations.

  Easier to pass around a sound manager than several different player instances.
  """
  mic_player = None
  heaphone_player = None
  stream_player = None

  def __init__(self):
    self.mic_player = SoundPlayer("CABLE Input (VB-Audio Virtual C")
    self.headphone_player = SoundPlayer("CABLE-A Input (VB-Audio Cable A")
    self.stream_player = SoundPlayer("CABLE-B Input (VB-Audio Cable B")

  @sync_to_async
  def setup_keybindings(self):
    """Load all keybindings for sound effects.

    So, here's the idea.
    We want to stick with using ctrl+shift+alt+SOME_NUMBER to play sounds. We
    don't want to deal with this awkward modifiers for multi digit numbers.
    In order to account for this, what we do instead is track a pagination value.
    This pagination value acts as our +10/-10 instead of adding an additional
    key to the keybinding.
    """
    sounds = Sound.objects.order_by("id")
    keyboard.add_hotkey("ctrl+shift+alt+}", self.increment_page, args=(True,))
    keyboard.add_hotkey("ctrl+shift+alt+{", self.increment_page, args=(False,))

    for i in range(10):
      keyboard.add_hotkey(f"ctrl+shift+alt+{i}", self.play_paginated_sound, args=(i,))

  def increment_page(self, positive=True):
    """Increments the current page value.

    We need to make sure to reset to 0 when we have no valid keybindings anymore.
    I.e. We have 37 keybindings and the page is set to 4. A page set to 4 implies
    a +40 to the index value aka we would never hit a valid keybinding.
    """
    max_page = (Sound.objects.count() - 1) // 10
    page = get_value(KEYBINDING_PAGE) + (1 if positive else -1)
    if page < 0:
      page = max_page
    elif page > max_page:
      page = 0
    set_value(KEYBINDING_PAGE, page)


  def play_paginated_sound(self, base_index):
    """Play a sound from a keybinding based on the current paged value."""
    page = get_value(KEYBINDING_PAGE)
    index = page * 10 + base_index
    if index >= Sound.objects.count():
      return

    sound = Sound.objects.order_by("id")[index]
    self.play_or_stop_sound(sound.sound_file.path, sound.name, mic=True, headphone=True)


  @sync_to_async
  def async_play_sound(self, sound_name=None, play_multiple=False, mic=False, headphone=False, stream=False):
    try:
      sound = Sound.objects.get(name=sound_name)
      self.play_sound(
        sound.sound_file.path,
        sound_name=sound_name,
        play_multiple=play_multiple,
        mic=mic,
        headphone=headphone,
        stream=stream
      )
    except Exception:
      pass

  def play_or_stop_sound(self, sound_path, sound_name, mic=False, headphone=False, stream=False):
    if mic:
      if not self.mic_player.sound_is_playing(sound_name):
        self.mic_player.play_sound(sound_path, sound_name=sound_name)
      else:
        self.mic_player.stop_sound(sound_name)

    if headphone:
      if not self.headphone_player.sound_is_playing(sound_name):
        self.headphone_player.play_sound(sound_path, sound_name=sound_name)
      else:
        self.headphone_player.stop_sound(sound_name)

    if stream:
      if not self.stream_player.sound_is_playing(sound_name):
        self.stream_player.play_sound(sound_path, sound_name=sound_name)
      else:
        self.stream_player.stop_sound(sound_name)

  def play_sound(self, sound_path, sound_name=None, play_multiple=False, mic=False, headphone=False, stream=False):
    # print(f"sound: {sound_name}, mulit: {play_multiple}, mic: {mic}, headphone: {headphone}, stream: {stream}")
    if mic:
      self.mic_player.play_sound(sound_path, sound_name=sound_name, play_multiple=play_multiple)

    if headphone:
      self.headphone_player.play_sound(sound_path, sound_name=sound_name, play_multiple=play_multiple)

    if stream:
      self.stream_player.play_sound(sound_path, sound_name=sound_name, play_multiple=play_multiple)

  def stop_sound(self, sound_name, mic=False, headphone=False, stream=False):
    if mic:
      self.mic_player.stop_sound(sound_name)

    if headphone:
      self.headphone_player.stop_sound(sound_name)

    if stream:
      self.stream_player.stop_sound(sound_name)
