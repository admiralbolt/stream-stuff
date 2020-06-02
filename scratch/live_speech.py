import time

import pyaudio
import pocketsphinx
from pocketsphinx import LiveSpeech

print(pocketsphinx.__file__)

web_cam_mic = "Microphone (HD Webcam C615)"
cable_output = "CABLE-A Output (VB-Audio Cable A"

p = pyaudio.PyAudio()

# for i in range(p.get_device_count()):
#   print(p.get_device_info_by_index(i))
#   print("LIVE SPEECH TEST")
#
#   j = 0
#   for phrase in LiveSpeech(audio_device=p.get_device_info_by_index(i)["name"]):
#     print(phrase)
#     time.sleep(0.1)
#     j += 1
#     if j >= 100:
#       break

for phrase in LiveSpeech(audio_device="asdfZX ASDF"):
  print(phrase)
