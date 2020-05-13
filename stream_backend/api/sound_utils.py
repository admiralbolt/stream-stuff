import pyaudio
import time
import wave
import os

class SoundPlayer():

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
    self.wave_file = wave.open(sound_model.sound_file.path, "rb")
    print(self.wave_file.getnchannels())
    print(self.wave_file.getframerate())
    self.stream.start_stream()

    while self.stream.is_active():
      time.sleep(0.1)

    self.stream.stop_stream()
    self.wave_file.close()
