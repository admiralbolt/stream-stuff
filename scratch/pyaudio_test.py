import pyaudio
import time
import wave

# Index = 18
VIRTUAL_INPUT_NAME = "CABLE Input (VB-Audio Virtual Cable)"
# Index = 20
VOICEMOD_INPUT_NAME = "Line (Voicemod Virtual Audio Device (WDM))"
CHUNK = 1024

wf = wave.open("minecraft-villager.wav", "rb")
p = pyaudio.PyAudio()

for i in range(p.get_device_count()):
  print(p.get_device_info_by_index(i))

exit()

def get_virtual_input(p):
  for i in range(p.get_device_count()):
    if p.get_device_info_by_index(i)["name"] == VIRTUAL_INPUT_NAME:
      print(p.get_device_info_by_index(i))
      return i
  return None

def callback(in_data, frame_count, time_info, status):
  data = wf.readframes(frame_count)
  return data, pyaudio.paContinue

stream = p.open(
  format=p.get_format_from_width(wf.getsampwidth()),
  channels=wf.getnchannels(),
  rate=wf.getframerate(),
  output=True,
  stream_callback=callback,
  output_device_index=7
)

# If I was using python 3.8 I could do this
# while data := wf.readframes(CHUNK):
#   stream.write(data)

# data = wf.readframes(CHUNK)
# while len(data) > 0:
#   stream.write(data)
#   data = wf.readframes(CHUNK)

stream.start_stream()

while stream.is_active():
  time.sleep(0.1)

wf = wave.open("minecraft-villager.wav", "rb")
print("try 2?")
stream.stop_stream()
stream.start_stream()

while stream.is_active():
  time.sleep(0.1)

stream.stop_stream()
stream.close()
wf.close()
p.terminate()
