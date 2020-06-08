import obspython as obs
import threading
import time

def get_size(scene_item):
  mat4 = obs.matrix4()
  obs.obs_sceneitem_get_box_transform(scene_item, mat4)
  print(f"x: {mat4.x.x}, y: {mat4.y.y}")
  return mat4.x.x, mat4.y.y

def sad(props, prop):
  t = threading.Thread(target=sad_threaded, args=[props, prop])
  t.start()

def sad_threaded(props, prop):
  # 1. Make it grayscale
  cam_source = obs.obs_get_source_by_name("Shitty Webcam")
  grayscale_filter = obs.obs_source_get_filter_by_name(cam_source, "Gray")

  data = obs.obs_data_create()
  obs.obs_data_set_double(data, "clut_amount", 1.0)
  obs.obs_source_update(grayscale_filter, data)

  # 2. Save initial props
  current_scene_source = obs.obs_frontend_get_current_scene()
  obs.obs_frontend_set_current_preview_scene(current_scene_source)
  current_scene = obs.obs_scene_from_source(current_scene_source)
  cam_sceneitem = obs.obs_scene_find_source(current_scene, "Shitty Webcam")

  initial_scale = obs.vec2()
  obs.obs_sceneitem_get_scale(cam_sceneitem, initial_scale)

  initial_pos = obs.vec2()
  obs.obs_sceneitem_get_pos(cam_sceneitem, initial_pos)

  initial_box_transform = obs.matrix4()
  obs.obs_sceneitem_get_box_transform(cam_sceneitem, initial_box_transform)

  initial_crop = obs.obs_sceneitem_crop()
  obs.obs_sceneitem_get_crop(cam_sceneitem, initial_crop)
  # matrix4.x.x -> x size
  # matrix4.y.y -> y size
  # matrix4.t.x -> x position
  # matrix4.t.y -> y position
  # for prop in ["x", "y", "z", "t"]:
  #   print(f"Matrix property {prop}")
  #   vec = getattr(initial_box_transform, prop)
  #   print(dir(vec))
  #   for vec_prop in ["m", "w", "x", "y", "z"]:
  #     print(f"Vec Property {vec_prop}: {getattr(vec, vec_prop)}")
  size_x = initial_box_transform.x.x
  size_y = initial_box_transform.y.y

  initial_draw_transform = obs.matrix4()
  obs.obs_sceneitem_get_draw_transform(cam_sceneitem, initial_draw_transform)
  print(dir(initial_draw_transform))

  # 3. Mute desktop audio, play sound of silence
  desktop_audio = obs.obs_get_output_source(4)
  obs.obs_source_set_muted(desktop_audio, True)

  song = obs.obs_source_create("ffmpeg_source", "Sound of Silence", None, None)
  song_settings = obs.obs_data_create()
  obs.obs_data_set_string(song_settings, "local_file", "C:\\Users\\avikn\\Downloads\\sound_of_silence.mp3")
  obs.obs_source_update(song, song_settings)
  obs.obs_data_release(song_settings)
  song_item = obs.obs_scene_add(current_scene, song)


  # 4. Scale up / reposition the camera.
  # It's gross but it works don't touch it.
  dynamic_scale = obs.vec2()
  obs.vec2_copy(dynamic_scale, initial_scale)

  increment = obs.vec2()
  increment.x = 0.0015
  increment.y = 0.0015


  crop = (initial_crop.top, initial_crop.right, initial_crop.bottom, initial_crop.left)
  size_x, size_y = get_size(cam_sceneitem)
  dynamic_crop = obs.obs_sceneitem_crop()

  bounds = obs.vec2()
  bounds.x = size_x
  bounds.y = size_y
  obs.obs_sceneitem_set_bounds(cam_sceneitem, bounds)


  for _ in range(240):
    obs.obs_sceneitem_set_bounds_type(cam_sceneitem, 0)
    obs.vec2_add(dynamic_scale, dynamic_scale, increment)
    obs.obs_sceneitem_set_scale(cam_sceneitem, dynamic_scale)
    nsize_x, nsize_y = get_size(cam_sceneitem)
    x_delta = nsize_x - size_x + (dynamic_crop.right * 2)
    y_delta = nsize_y - size_y + (dynamic_crop.top * 2)

    dynamic_crop.top = int(y_delta / 2)
    dynamic_crop.right = int(x_delta / 2)
    dynamic_crop.bottom = int(y_delta / 2)
    dynamic_crop.left = int(x_delta / 2)

    obs.obs_sceneitem_set_crop(cam_sceneitem, dynamic_crop)

    obs.obs_sceneitem_set_bounds_type(cam_sceneitem, 1)
    obs.obs_frontend_preview_program_trigger_transition()
    time.sleep(0.1)

  # 5. Cleanup
  obs.obs_source_set_muted(desktop_audio, False)

  obs.obs_sceneitem_set_scale(cam_sceneitem, initial_scale)
  obs.obs_sceneitem_set_crop(cam_sceneitem, initial_crop)
  obs.obs_data_set_double(data, "clut_amount", 0.0)
  obs.obs_source_update(grayscale_filter, data)
  obs.obs_sceneitem_remove(song_item)
  obs.obs_source_release(song)
  time.sleep(0.1)
  obs.obs_frontend_preview_program_trigger_transition()



### OBS Stuff
def script_description():
  return "Makes the streamer very sad."

def script_properties():
  props = obs.obs_properties_create()

  obs.obs_properties_add_button(props, "button", "So Sad", sad)
  return props
