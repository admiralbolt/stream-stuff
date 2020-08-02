import keyboard

from asgiref.sync import sync_to_async

from api.audio.sound_player import SoundPlayer
from api.models import Sound

def get_keybind(index):
  """A method for getting a keybinding for the Nth sound.

  The default keybind is ctrl+shift+alt+index.
  'z' acts as as +10 so sound 11 is ctrl+shift+alt+z+index.
  e.t.c.
  """
  modifier = ""
  if index >= 30:
    modifier = "+z+x"
  elif index >= 20:
    modifier = "+x"
  elif index >= 10:
    modifier = "+z"
  return f"ctrl+shift+alt+{index % 10}" + modifier

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
    """Load all keybindings for sound effects."""
    sounds = Sound.objects.order_by("id")
    print("SOUNDBOARD KEYBINDINGS")
    print("======================")
    for i, sound in enumerate(sounds):
      print(f"{get_keybind(i)}, {sound.name}")
      keyboard.add_hotkey(get_keybind(i), self.play_sound, args=(sound.sound_file.path, sound.name, False, True, True))
      keyboard.add_hotkey(f"{get_keybind(i)}+q", self.stop_sound, args=(sound.name, True, True))

  def play_sound(self, sound_path, sound_name=None, play_multiple=False, mic=False, headphone=False, stream=False):
    print(f"sound: {sound_name}, mulit: {play_multiple}, mic: {mic}, headphone: {headphone}, stream: {stream}")
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
