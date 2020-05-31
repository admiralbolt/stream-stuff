from pprint import pprint
import time

from obswebsocket.requests import *

from api import models
from api.obs.base_script import BaseScript, CONSTANTS

SCALE_INCREMENT = 0.003
SOUND_MODEL = models.Sound.objects.get(name="Sound Of Silence")


class SadBoyzScript(BaseScript):

  initial_props = None

  def execute(self):
    #1. Set the camera to grayscale.
    self.call(SetSourceFilterSettings(CONSTANTS["CAMERA_SOURCE"], "Gray", {"clut_amount": 1.0}))

    #2. Save initial props, set the preview scene as the current.
    current_scene_info = self.call(GetCurrentScene())
    current_scene_name = current_scene_info.getName()
    self.call(SetCurrentScene(current_scene_name))

    self.initial_props = self.call(GetSceneItemProperties(CONSTANTS["CAMERA_SOURCE"], scene_name=current_scene_name))

    scale = {
      "x": self.initial_props.getScale()["x"],
      "y": self.initial_props.getScale()["y"]
    }
    crop = self.initial_props.getCrop()
    # The source sizes returned are UNSCALED!
    base_width = self.initial_props.getSourcewidth()
    base_height = self.initial_props.getSourceheight()
    initial_scaled_width = base_width * scale["x"]
    initial_scaled_height = base_height * scale["y"]

    # Set bounds to be the current size of the image.
    self.call(SetSceneItemProperties(
      CONSTANTS["CAMERA_SOURCE"],
      bounds={
        "type": "OBS_BOUNDS_STRETCH",
        "x": initial_scaled_width,
        "y": initial_scaled_height
      }
    ))

    #3. Mute desktop audio and play the sound of silence.
    self.call(SetMute(CONSTANTS["DESKTOP_AUDIO_SOURCE"], True))
    self.stream_sound_player.play_sound(SOUND_MODEL)
    self.headphone_sound_player.play_sound(SOUND_MODEL)


    # 4. Slowly zoom in on the camera :)
    while not self.thread.stopped():
      scale["x"] = scale["x"] + SCALE_INCREMENT
      scale["y"] = scale["y"] + SCALE_INCREMENT

      # The size of the source ignoring cropping / rescaling.
      scaled_height = base_height * scale["y"]
      scaled_width = base_width * scale["x"]

      crop_vertical = (scaled_height - initial_scaled_height) // 2
      crop_horizontal = (scaled_width - initial_scaled_width) // 2

      self.call(SetSceneItemProperties(
        CONSTANTS["CAMERA_SOURCE"],
        scale=scale,
        crop={
          "top": crop_vertical,
          "bottom": crop_vertical,
          "left": crop_horizontal,
          "right": crop_horizontal
        }
      ))

      self.call(TransitionToProgram({
        "name": "Cut",
        "duration": 0
      }))
      time.sleep(0.1)

    self.cleanup()
    return

  def cleanup(self):
    # Reset scale / crop if they exist.
    if self.initial_props is not None:
      self.call(SetSceneItemProperties(
        CONSTANTS["CAMERA_SOURCE"],
        scale=self.initial_props.getScale(),
        crop=self.initial_props.getCrop(),
        bounds={
          "type": "OBS_BOUNDS_NONE",
          "x": 0,
          "y": 0
        }
      ))
      self.call(TransitionToProgram({
        "name": "Cut",
        "duration": 0
      }))

    # Unmute desktop audio, kill sound of silence.
    self.call(SetMute(CONSTANTS["DESKTOP_AUDIO_SOURCE"], False))
    self.stream_sound_player.stop_sound(SOUND_MODEL)
    self.headphone_sound_player.stop_sound(SOUND_MODEL)


    self.call(SetSourceFilterSettings("Shitty Webcam", "Gray", {"clut_amount": 0.0}))
    self.thread = None
    return
