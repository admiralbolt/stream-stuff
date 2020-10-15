import collections
import logging
import os
import random
import time

import pyaudio
from pydub import AudioSegment

from api.utils.stoppable_thread import StoppableThread

logger = logging.getLogger(__name__)

class SoundPlayer():

  """
  Manages threads / streams, keyed by sound_name

  {
    "gotem": {
      "thread": Some thread object,
      "segment": Some segment object,
      "stream": Some stream object,
      "callback": Some callback function,
      "current_frame": 0
    }
  }
  """
  data = None

  # Loaded audio segment
  segment = None
  stream = None
  current_frame = 0

  def __init__(self, audio_device_name):
    self.p = pyaudio.PyAudio()
    self.data = collections.defaultdict(dict)
    self.output_device_index = self._get_audio_device(audio_device_name)

  def __del__(self):
    self.p.terminate()

  def _get_audio_device(self, input_name):
    if input_name is None:
      return None

    for i in range(self.p.get_device_count()):
      if self.p.get_device_info_by_index(i)["name"] == input_name:
        return i
    logger.info(f"Can't find device {input_name}, using default instead.")
    return None

  def generate_callback(self, sound_name):
    def callback(in_data, frame_count, time_info, status):
      start_frame = self.data[sound_name]["current_frame"] * self.data[sound_name]["segment"].frame_width
      end_frame = (self.data[sound_name]["current_frame"] + frame_count) * self.data[sound_name]["segment"].frame_width
      data = self.data[sound_name]["segment"]._data[start_frame:end_frame]
      self.data[sound_name]["current_frame"] += frame_count
      return data, pyaudio.paContinue

    return callback

  def play_sound(self, sound_path, sound_name=None, play_multiple=False):
    """Play a sound to a target location:

    sound_path: The path to the sound file.
    sound_name: An optional sound_name, if not specified use the sound_path basename.
    play_multiple: An option to allow playing multiple of the same sound, defaults to False.
    """
    sound_name = sound_name or os.path.basename(sound_path)
    if play_multiple:
      sound_name = f"{sound_name}_{random.random()}"
    elif sound_name in self.data:
      return

    self.data[sound_name]["segment"] = AudioSegment.from_file(sound_path)
    self.data[sound_name]["current_frame"] = 0
    self.data[sound_name]["callback"] = self.generate_callback(sound_name)
    self.data[sound_name]["stream"] = self.p.open(
      format=self.p.get_format_from_width(self.data[sound_name]["segment"].sample_width),
      channels=self.data[sound_name]["segment"].channels,
      rate=self.data[sound_name]["segment"].frame_rate,
      output=True,
      stream_callback=self.data[sound_name]["callback"],
      output_device_index=self.output_device_index,
      start=False
    )

    self.data[sound_name]["thread"] = StoppableThread(
      target=self.play_sound_threaded,
      args=(sound_name,)
    )
    self.data[sound_name]["thread"].start()

  def sound_is_playing(self, sound_name):
    if sound_name not in self.data:
      return False

    if "stream" not in self.data[sound_name]:
      return False

    return self.data[sound_name]["stream"].is_active() and not self.data[sound_name]["thread"].stopped()

  def play_sound_threaded(self, sound_name):
    self.data[sound_name]["stream"].start_stream()

    while self.sound_is_playing(sound_name):
      time.sleep(0.1)

    if "stream" in self.data[sound_name]:
      self.data[sound_name]["stream"].stop_stream()
    del self.data[sound_name]

  def stop_sound(self, sound_name):
    if sound_name not in self.data or self.data[sound_name]["stream"] is None:
      return

    self.data[sound_name]["thread"].stop()
