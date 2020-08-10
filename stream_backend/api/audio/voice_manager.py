import hashlib
import os

from gtts import gTTS


class VoiceManager:

  # Sound Manager for playing sounds.
  sound_manager = None

  def __init__(self, sound_manager):
    self.sound_manager = sound_manager
    self.tts_dir = os.path.join(os.getcwd(), "tmp")

  def tts(self, text):
    """Says the given text using Google Text To Speech.

    Since the actual loading of audio is super slow, we cache
    each phrase in a tmp folder keyed by it's md5 hash.
    """
    file_path = os.path.join(
      self.tts_dir,
      f"tts_{hashlib.md5(text.encode('utf-8')).hexdigest()}.mp3"
    )
    if not os.path.isfile(file_path):
      text_data = gTTS(text)
      text_data.save(file_path)

    self.sound_manager.play_sound(file_path, mic=True, headphone=True)
    return
