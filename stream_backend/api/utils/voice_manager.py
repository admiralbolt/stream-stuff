import os
import threading
import time

import speech_recognition as sr
from gtts import gTTS
from pydub import AudioSegment
from fuzzywuzzy import fuzz
import pyaudio

from api.utils.stoppable_thread import StoppableThread

VOICEMOD_MIC = "Microphone (Voicemod Virtual Au"
ACTIVATION_PHRASE = "okay admiral lightning bot"


class VoiceManager:

  # Sound Manager for playing sounds.
  sound_manager = None

  # Thread that *only* listens for activation phrase
  activation_listener_thread = None

  # List of threads processing audio to text
  tester_threads = []

  def __init__(self, sound_manager):
    from api.models import Sound
    self.sound_manager = sound_manager
    self.p = pyaudio.PyAudio()
    self.r = sr.Recognizer()
    self.all_sounds = [sound.name for sound in Sound.objects.all()]

    # Load our mic input
    for i in range(self.p.get_device_count()):
      if self.p.get_device_info_by_index(i)["name"] == VOICEMOD_MIC:
        self.source = sr.Microphone(device_index=i)
        self.source.__enter__()
        self.r.adjust_for_ambient_noise(self.source, duration=3)
        break

  def tts(self, text):
    data = gTTS(text)
    sound_file = os.path.join(os.getcwd(), "tts.mp3")
    data.save(sound_file)
    self.sound_manager.play_sound(sound_file, mic=True, headphone=True)
    time.sleep(1)
    return

  def test_for_activation(self, audio):
    text = self.r.recognize_sphinx(audio)

    # Match the text to our activation phrase.
    # print(fuzz.partial_ratio(text, ACTIVATION_PHRASE))
    if fuzz.partial_ratio(text, ACTIVATION_PHRASE) < 80:
      return

    self.stop_listening()

    self.tts("How can I help?")
    try:
      audio = self.r.listen(self.source, timeout=5, phrase_time_limit=5)
      text = self.r.recognize_sphinx(audio)

      words = text.split()
      if words[0].startswith("play"):
        scored_sounds = sorted(
          self.all_sounds,
          key=lambda sound: fuzz.partial_ratio("".join(words[1:]), sound),
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

      else:
        self.tts("I'm not sure how to help with that.")
    except Exception as e:
      print(e)
    finally:
      self.start_listening()



  def listen_for_activation(self):
    while not self.activation_listener_thread.stopped():
      try:
        audio = self.r.listen(self.source, timeout=1, phrase_time_limit=5)

        t = threading.Thread(
          target=self.test_for_activation,
          args=(audio,)
        )
        t.setDaemon(True)
        t.start()
        self.tester_threads.append(t)


      except Exception as e:
        pass


  def start_listening(self):
    self.activation_listener_thread = StoppableThread(target=self.listen_for_activation)
    self.activation_listener_thread.setDaemon(True)
    self.activation_listener_thread.start()

  def stop_listening(self):
    self.activation_listener_thread.stop()
