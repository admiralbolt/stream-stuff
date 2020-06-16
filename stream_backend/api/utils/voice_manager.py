from datetime import datetime
import hashlib
import os
from pprint import pprint
import threading
import time

import speech_recognition as sr
from gtts import gTTS
from pydub import AudioSegment
from fuzzywuzzy import fuzz
import pyaudio

from api.utils.stoppable_thread import StoppableThread
from api.utils.sphinx_keywords import KEYWORDS

VOICEMOD_MIC = "Microphone (Voicemod Virtual Au"
# ACTIVATION_PHRASE = "okay admiral lightning bot"
ACTIVATION_PHRASE = "bought lightning admiral okay"


class VoiceManager:

  # Sound Manager for playing sounds.
  sound_manager = None

  # Thread that *only* listens for activation phrase
  activation_listener_thread = None

  def __init__(self, sound_manager):
    from api.models import Sound
    self.sound_manager = sound_manager
    self.p = pyaudio.PyAudio()
    self.r = sr.Recognizer()
    self.all_sounds = [sound.name for sound in Sound.objects.all()]
    self.tts_dir = os.path.join(os.getcwd(), "tmp")

    from api.utils.twitch_client import TwitchClient
    self.twitch_client = TwitchClient()

    # Load our mic input
    for i in range(self.p.get_device_count()):
      if self.p.get_device_info_by_index(i)["name"] == VOICEMOD_MIC:
        self.source = sr.Microphone(device_index=i)
        self.source.__enter__()
        self.r.adjust_for_ambient_noise(self.source, duration=3)
        print(f"minimum energy threshold: {self.r.energy_threshold}")
        self.r.energy_threshold = 10000
        break

  def time(self, title):
    print(title)
    print(datetime.utcnow() - self.current_time)
    self.current_time = datetime.utcnow()
    return

  def tts(self, text):
    file_path = os.path.join(
      self.tts_dir,
      f"tts_{hashlib.md5(text.encode('utf-8')).hexdigest()}.mp3"
    )
    if not os.path.isfile(file_path):
      text_data = gTTS(text)
      text_data.save(file_path)

    self.sound_manager.play_sound(file_path, mic=True, headphone=True)
    time.sleep(0.5)
    return

  def test_for_activation(self, audio):
    try:
      # This is slow and needs to go faster.
      text = self.r.recognize_sphinx(audio, keyword_entries=KEYWORDS)

      # Match the text to our activation phrase.
      print(f"text: [{text}], ratio: {fuzz.ratio(text, ACTIVATION_PHRASE)}")
      if fuzz.ratio(text, ACTIVATION_PHRASE) < 80:
        return

      self.tts("How can I help?")
      audio = self.r.listen(self.source, timeout=5, phrase_time_limit=3)
      text = self.r.recognize_sphinx(audio)

      print(f"PARSED COMMAND: [{text}]")

      words = text.split()
      # I feel like my diction isn't that bad but I very consistently get clay.
      if words[0].startswith("play") or words[0].startswith("clay"):
        scored_sounds = sorted(
          self.all_sounds,
          key=lambda sound: fuzz.ratio("".join(words[1:]), sound.lower()),
          reverse=True
        )
        from api.models import Sound
        sound_model = Sound.objects.get(name=scored_sounds[0])

        self.sound_manager.play_sound(
          sound_model.sound_file.path,
          sound_name=sound_model.name,
          mic=True,
          headphone=True
        )

      # Oh man I'm a genius
      elif words[0].startswith("say"):
        self.tts("".join(words[1:]))
      # Fuzz match spoken text for 'clip that'
      elif fuzz.ratio(text, "clip that") >= 70:
        self.tts("Okay. Clipping that shit.")
        self.twitch_client.clip_that()

      else:
        self.tts("I'm not sure how to help with that.")
    except Exception as e:
      pass


  def listen_for_activation(self):
    while not self.activation_listener_thread.stopped():
      try:
        self.current_time = datetime.utcnow()
        audio = self.r.listen(self.source, timeout=10, phrase_time_limit=4)
        self.test_for_activation(audio)
      except Exception as e:
        pass


  def start_listening(self):
    self.activation_listener_thread = StoppableThread(target=self.listen_for_activation)
    self.activation_listener_thread.setDaemon(True)
    self.activation_listener_thread.start()


  def stop_listening(self):
    self.activation_listener_thread.stop()
