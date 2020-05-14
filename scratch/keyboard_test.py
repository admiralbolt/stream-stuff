import keyboard
import requests

def play_sound(sound_id):
  print(f"playing sound: {sound_id}")
  requests.get(f"http://localhost:8000/play_sound?sound_id={sound_id}")

keyboard.add_hotkey('ctrl+shift+a, s', play_sound, args=(4,))
# keyboard.add_hotkey('ctrl+shift+alt+a', print, args=('triggered', 'asdf'))

keyboard.wait('esc')
