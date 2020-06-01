import pyaudio
import speech_recognition as sr
from gtts import gTTS
from pydub import AudioSegment
from pydub.playback import play
import os

MIC_OUTPUT = "CABLE Output (VB-Audio Virtual Cable)"
VOICEMOD_OUTPUT = "Microphone (Voicemod Virtual Audio Device (WDM))"
WEBCAM_MIC = "Microphone (HD Webcam C615)"
VOICEMOD_MIC = "Microphone (Voicemod Virtual Au"

def get_input_index(p, name):
  for i in range(p.get_device_count()):
    if p.get_device_info_by_index(i)["name"] == name:
      print(p.get_device_info_by_index(i))
      return i
  return None

p = pyaudio.PyAudio()
r = sr.Recognizer()
with sr.Microphone(device_index=get_input_index(p, VOICEMOD_MIC)) as source:
  r.adjust_for_ambient_noise(source, duration=2)
  print(f"Set minimum energy threshold to {r.energy_threshold}")
  print("Say something!")

  try:
    audio = r.listen(source, timeout=3)

    text = r.recognize_sphinx(audio)
    print(text)

    cwd = os.getcwd()

    data = gTTS(text)
    data.save(os.path.join(cwd, "test.mp3"))
    mp3_sound = AudioSegment.from_file(os.path.join(cwd, "test.mp3"))
    play(mp3_sound)


  except sr.UnknownValueError:
    print("Sphinx could not understand audio")
  except sr.RequestError as e:
    print("Sphinx error; {0}".format(e))
  except Error as e:
    print(e)

exit()
