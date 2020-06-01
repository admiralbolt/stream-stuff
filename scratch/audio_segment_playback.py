import pyaudio
import time
import wave

from pydub import AudioSegment
from pydub.playback import play

CABLE_A = "CABLE-A Input (VB-Audio Cable A"


def get_device_by_name(p, name):
  for i in range(p.get_device_count()):
    if p.get_device_info_by_index(i)["name"] == name:
      print(p.get_device_info_by_index(i))
      return i
  return None

p = pyaudio.PyAudio()
segment = AudioSegment.from_file("warmup.wav")
frame_size = segment.channels * segment.sample_width
segment_iterator = 0
print(segment.frame_count())

wave_file = wave.open("warmup.wav", "rb")
print(wave_file.getnframes())

print("AADFSF")


print(len(segment))
# play(segment)

def callback(in_data, frame_count, time_info, status):
  global segment
  global segment_iterator
  global wave_file
  global frame_size
  wave_data = wave_file.readframes(frame_count)

  print(segment.frame_width)

  data = segment._data[segment_iterator * segment.frame_width:(segment_iterator + frame_count) * segment.frame_width]

  print(f"data comp {wave_data == data}")
  print(len(wave_data))
  print(len(data))

  segment_iterator += frame_count

  return data, pyaudio.paContinue

stream = p.open(
  format = p.get_format_from_width(segment.sample_width),
  channels=segment.channels,
  rate=segment.frame_rate,
  output=True,
  stream_callback=callback
  # output_device_index=get_device_by_name(p, CABLE_A)
)

print("STarting the stream")

stream.start_stream()

while stream.is_active():
  time.sleep(0.1)

print("Shutting down")

stream.stop_stream()
stream.close()
p.terminate()
