import os
import time
import wave

import pyaudio

from api.utils.stoppable_thread import StoppableThread

class SoundPlayer():

  # A local dictionary for keeping track of active threads based on the sound
  # name.
  threads = {}

  def __init__(self, input_name=None):
    self.wave_file = wave.open("api/warmup.wav", "rb")
    self.p = pyaudio.PyAudio()
    self.output_device_index = self._get_output_device(input_name)
    self.stream = self.p.open(
      format=self.p.get_format_from_width(self.wave_file.getsampwidth()),
      channels=self.wave_file.getnchannels(),
      rate=self.wave_file.getframerate(),
      output=True,
      stream_callback=self.callback,
      output_device_index=self.output_device_index,
      start=False
    )

  def __del__(self):
    self.stream.stop_stream()
    self.stream.close()
    self.p.terminate()


  def _get_output_device(self, input_name):
    if input_name is None:
      return None

    for i in range(self.p.get_device_count()):
      if self.p.get_device_info_by_index(i)["name"] == input_name:
        return i
    return None

  def callback(self, in_data, frame_count, time_info, status):
    data = self.wave_file.readframes(frame_count)

    return data, pyaudio.paContinue

  def play_sound(self, sound_model):
    self.threads[sound_model.name] = StoppableThread(
      target=self.play_sound_threaded,
      args=(sound_model,)
    )
    self.threads[sound_model.name].setDaemon(True)
    self.threads[sound_model.name].start()

  def play_sound_threaded(self, sound_model):
    self.wave_file = wave.open(sound_model.sound_file.path, "rb")
    self.stream.start_stream()

    while self.stream.is_active() and not self.threads[sound_model.name].stopped():
      time.sleep(0.1)

    self.stream.stop_stream()
    self.wave_file.close()

  def stop_sound(self, sound_model):
    if sound_model.name not in self.threads:
      return

    self.threads[sound_model.name].stop()
