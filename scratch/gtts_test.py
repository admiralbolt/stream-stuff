import pyaudio
from pydub import AudioSegment
from pydub.playback import play
import time
import wave

import os

from gtts import gTTS


cwd = os.getcwd()

data = gTTS("Hello Stream")
data.save(os.path.join(cwd, "test.mp3"))
mp3_sound = AudioSegment.from_file(os.path.join(cwd, "test.mp3"))
play(mp3_sound)

exit()





mp3_sound.export(os.path.join(cwd, "test.wav"), format="wav")

wf = wave.open(os.path.join(cwd, "test.wav"), "rb")

def callback(in_data, frame_count, time_info, status):
  data = wf.readframes(frame_count)
  return data, pyaudio.paContinue

p = pyaudio.PyAudio()

CABLE_INPUT = "CABLE-A Input (VB-Audio Cable A"
STREAM_INPUT = "CABLE-B Input (VB-Audio Cable B"

def get_device_by_name(p, name):
  for i in range(p.get_device_count()):
    if p.get_device_info_by_index(i)["name"] == name:
      print(p.get_device_info_by_index(i))
      return i
  return None

stream = p.open(
  format=p.get_format_from_width(wf.getsampwidth()),
  channels=wf.getnchannels(),
  rate=wf.getframerate(),
  output=True,
  stream_callback=callback,
  output_device_index=get_device_by_name(p, STREAM_INPUT)
)

stream.start_stream()
while stream.is_active():
  time.sleep(0.1)

stream.stop_stream()
