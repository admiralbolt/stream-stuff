import os
import time

import pyaudio
from pydub import AudioSegment

from api.utils.stoppable_thread import StoppableThread


class SoundPlayer():

  threads = {}

  # Loaded audio segment
  segment = None
  stream = None
  current_frame = 0

  def __init__(self, audio_device_name):
    self.p = pyaudio.PyAudio()
    self.output_device_index = self._get_audio_device(audio_device_name)

  def __del__(self):
    self.p.terminate()

  def _get_audio_device(self, input_name):
    if input_name is None:
      return None

    for i in range(self.p.get_device_count()):
      if self.p.get_device_info_by_index(i)["name"] == input_name:
        return i
    return None

  def callback(self, in_data, frame_count, time_info, status):
    start_frame = self.current_frame * self.segment.frame_width
    end_frame = (self.current_frame + frame_count) * self.segment.frame_width
    data = self.segment._data[start_frame:end_frame]
    self.current_frame += frame_count

    return data, pyaudio.paContinue

  def play_sound(self, sound_path, sound_name=None):
    """Play a sound to a target location:

    sound_path: The path to the sound file.
    sound_name: An optional sound_name, if not specified use the sound_path basename.
    """
    sound_name = sound_name or os.path.basename(sound_path)
    self.segment = AudioSegment.from_file(sound_path)
    self.current_frame = 0
    self.stream = self.p.open(
      format=self.p.get_format_from_width(self.segment.sample_width),
      channels=self.segment.channels,
      rate=self.segment.frame_rate,
      output=True,
      stream_callback=self.callback,
      output_device_index=self.output_device_index,
      start=False
    )

    self.threads[sound_name] = StoppableThread(
      target=self.play_sound_threaded,
      args=(sound_name,)
    )
    # self.threads[sound_name].setDaemon(True)
    self.threads[sound_name].start()

  def play_sound_threaded(self, sound_name):
    self.stream.start_stream()

    while self.stream.is_active() and not self.threads[sound_name].stopped():
      time.sleep(0.1)

    self.stream.stop_stream()
    self.stream = None

  def stop_sound(self, sound_name):
    if sound_name not in self.threads or self.stream is None:
      return

    self.threads[sound_name].stop()
