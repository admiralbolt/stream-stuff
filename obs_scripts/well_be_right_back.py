import cv2
import obspython as obs
import os
import sys
import time
# Please fix this later once the cache isn"t bunk
# Hello again, please fix this later
from cv2_obs_utils_asdf.cv2_obs_utils import helpers
# from cv2_obs_utils import helpers

def do_stuff(props, prop):
  obs.obs_frontend_recording_start()
  obs.obs_frontend_recording_stop()
  time.sleep(0.35)

  # 1. Get Freeze Frame, Save it to disk somewhere
  latest_frame = helpers.get_latest_frame()
  sepia_frame = helpers.sepia_filter(latest_frame)
  mixed_frame = cv2.addWeighted(latest_frame, 0.4, sepia_frame, 0.6, 0)
  blurred_frame = helpers.blur(mixed_frame, kernel_size=21)
  # Dunno why default folder isn"t loading ?
  img_path = os.path.join("C:\\Users\\avikn\\Videos\\", "blurred.png")
  cv2.imwrite(img_path, blurred_frame)

  # 2. Add the freeze frame as a new full sized source
  current_scene_source = obs.obs_frontend_get_current_scene()
  current_scene = obs.obs_scene_from_source(current_scene_source)
  freeze_frame = obs.obs_source_create("image_source", "FreezeFrame", None, None)

  image_settings = obs.obs_data_create()
  obs.obs_data_set_string(image_settings, "file", img_path)
  obs.obs_source_update(freeze_frame, image_settings)
  obs.obs_data_release(image_settings)

  freeze_item = obs.obs_scene_add(current_scene, freeze_frame)
  obs.obs_frontend_preview_program_trigger_transition()

  #3. Add A text source for the We'll be right back
  text = obs.obs_source_create("text_gdiplus", "BeRightBack", None, None)
  text_settings = obs.obs_data_create()
  font_settings = obs.obs_data_create()
  obs.obs_data_set_string(font_settings, "face", "Helvetica")
  obs.obs_data_set_int(font_settings, "size", 128)
  obs.obs_data_set_obj(text_settings, "font", font_settings)
  obs.obs_data_set_bool(text_settings, "outline", True)
  obs.obs_data_set_double(text_settings, "outline_size", 10)
  obs.obs_data_set_double(text_settings, "outline_color", 0)
  obs.obs_data_set_bool(text_settings, "extents", True)
  obs.obs_data_set_bool(text_settings, "extents_wrap", True)
  obs.obs_data_set_int(text_settings, "extents_cx", 300)
  obs.obs_data_set_int(text_settings, "extents_cy", 600)
  obs.obs_data_set_string(text_settings, "text", "We'll Be Right Back")
  obs.obs_source_update(text, text_settings)
  obs.obs_data_release(text_settings)

  text_item = obs.obs_scene_add(current_scene, text)

  #4. Add a media source for the sound byte
  song = obs.obs_source_create("ffmpeg_source", "Jingle", None, None)
  song_settings = obs.obs_data_create()
  obs.obs_data_set_string(song_settings, "local_file", "C:\\Users\\avikn\\Downloads\\brb_jingle.mp3")
  obs.obs_source_update(song, song_settings)
  obs.obs_data_release(song_settings)

  song_item = obs.obs_scene_add(current_scene, song)

  #5. Trigger the transition so that it updates, mute other audio sources.
  obs.obs_frontend_preview_program_trigger_transition()
  desktop_audio = obs.obs_get_output_source(1)
  obs.obs_source_set_muted(desktop_audio, True)

  mic_audio = obs.obs_get_output_source(3)
  obs.obs_source_set_muted(mic_audio, True)

  #6. Artificial delay, then cleanup.
  time.sleep(4)

  obs.obs_sceneitem_remove(freeze_item)
  obs.obs_source_release(freeze_frame)

  obs.obs_sceneitem_remove(text_item)
  obs.obs_source_release(text)

  obs.obs_sceneitem_remove(song_item)
  obs.obs_source_release(song)

  obs.obs_source_set_muted(desktop_audio, False)
  obs.obs_source_set_muted(mic_audio, False)
  obs.obs_frontend_preview_program_trigger_transition()



### OBS Stuff
def script_description():
  return "Makes an Eric Andre style 'We'll be right back' overlay."

def script_update(settings):
  global asdf

  asdf = obs.obs_data_get_string(settings, "asdf")

def script_defaults(settings):
  obs.obs_data_set_default_string(settings, "asdf", "HELLO WORLD")

def script_properties():
  props = obs.obs_properties_create()

  obs.obs_properties_add_text(props, "asdf", "LABEL?", obs.OBS_TEXT_DEFAULT)
  obs.obs_properties_add_button(props, "button", "We'll Be Right Back", do_stuff)
  return props
