import time

from obswebsocket.requests import SetSourceFilterSettings

from api.obs.base_script import BaseScript


class SadBoyzScript(BaseScript):

  def execute(self):
    # cam_source = self.client.get_source_by_name("Shitty Webcam")
    # grayscale_filter = self.client.get_source_filter_by_name(cam_source, "Gray")
    self.call(SetSourceFilterSettings("Shitty Webcam", "Gray", {"clut_amount": 1.0}))
    while not self.thread.stopped():
      time.sleep(0.5)

    self.cleanup()

  def cleanup(self):
    self.call(SetSourceFilterSettings("Shitty Webcam", "Gray", {"clut_amount": 0.0}))
    self.thread = None
    pass
