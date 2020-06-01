from api.utils.sound_player import SoundPlayer

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

  def play_sound(self, sound_path, sound_name=None, mic=False, headphone=False, stream=False):
    if mic:
      self.mic_player.play_sound(sound_path, sound_name=sound_name)

    if headphone:
      self.headphone_player.play_sound(sound_path, sound_name=sound_name)

    if stream:
      self.stream_player.play_sound(sound_path, sound_name=sound_name)

  def stop_sound(self, sound_name, mic=False, headphone=False, stream=False):
    if mic:
      self.mic_player.stop_sound(sound_name)

    if headphone:
      self.headphone_player.stop_sound(sound_name)

    if stream:
      self.stream_player.stop_sound(sound_name)
