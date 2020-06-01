import pyaudio
import speech_recognition as sr
from gtts import gTTS
from pydub import AudioSegment
from pydub.playback import play
import os
from fuzzywuzzy import fuzz

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
cwd = os.getcwd()
device_index = get_input_index(p, VOICEMOD_MIC)
ACTIVATION_PHRASE = "okay admiral lightning bot"

with sr.Microphone(device_index=device_index) as source:
  r.adjust_for_ambient_noise(source, duration=3)
  print(f"Set minimum energy threshold to {r.energy_threshold}")
  while True:

    try:
      print("Say something!")
      audio = r.listen(source, timeout=3, phrase_time_limit=5)
      text = r.recognize_sphinx(audio)
      print(text)

      # Match the text to our activation phrase.
      print(fuzz.partial_ratio(text, ACTIVATION_PHRASE))
      if fuzz.partial_ratio(text, ACTIVATION_PHRASE) < 80:
        continue

      # Say that we are waiting for input
      data = gTTS("How can I help?")
      data.save(os.path.join(cwd, "asdf.mp3"))
      mp3_sound = AudioSegment.from_file(os.path.join(cwd, "asdf.mp3"))
      play(mp3_sound)

      print("Listening again!")
      audio = r.listen(source, timeout=3, phrase_time_limit=5)
      text = r.recognize_sphinx(audio)

      # Process the new audio and execute accordingly.
      # "Play <>"
      # "Say <>"
      # "Activate <>"
      print(text)

      words = text.split()
      if words[0] == "say":
        tts = gTTS(" ".join(words[1:]))
        tts.save(os.path.join(cwd, "asdf.mp3"))
        mp3_sound = AudioSegment.from_file(os.path.join(cwd, "asdf.mp3"))
        play(mp3_sound)


    except sr.UnknownValueError:
      print("Sphinx could not understand audio")
    except sr.RequestError as e:
      print("Sphinx error; {0}".format(e))
    except Exception as e:
      print(e)
