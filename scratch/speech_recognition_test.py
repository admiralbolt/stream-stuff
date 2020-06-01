import pyaudio
import speech_recognition as sr

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



    print("Sphinx thinks you said: " + r.recognize_sphinx(audio))
  except sr.UnknownValueError:
    print("Sphinx could not understand audio")
  except sr.RequestError as e:
    print("Sphinx error; {0}".format(e))
  except:
    print("listening timed out.")

exit()


# print(sr.Microphone.list_working_microphones())

p = pyaudio.PyAudio()
r = sr.Recognizer()
for i in range(p.get_device_count()):
  print(f"Testing device_index={i}")
  print(p.get_device_info_by_index(i))
  with sr.Microphone(device_index=i) as source:
    r.adjust_for_ambient_noise(source, duration=2)
    print(f"Set minimum energy threshold to {r.energy_threshold}")
    print("Say something!")

    try:
      audio = r.listen(source, timeout=3)

      print("Sphinx thinks you said: " + r.recognize_sphinx(audio))
    except sr.UnknownValueError:
      print("Sphinx could not understand audio")
    except sr.RequestError as e:
      print("Sphinx error; {0}".format(e))
    except:
      print("listening timed out.")

  print("===================")
  print("\n\n")
