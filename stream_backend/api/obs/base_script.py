from api.utils.stoppable_thread import StoppableThread

CONSTANTS = {
  "CAMERA_SOURCE": "Shitty Webcam",
  "MIC_SOURCE": "Mic/Aux",
  "DESKTOP_AUDIO_SOURCE": "Mic/Aux 2",
  "CANVAS_TICK": 25
}


class BaseScript:

  # A process variable for tracking the current execution
  thread = None

  # An OBSClient
  client = None

  # Sound players for mic / headphone sounds
  mic_player = None
  headphone_player = None

  def __init__(self, client, sound_manager):
    self.client = client
    self.sound_manager = sound_manager
    pass

  def call(self, request):
    return self.client.socket_client.call(request)

  def start(self):
    if self.thread is not None:
      return

    self.thread = StoppableThread(target=self.execute, args=())
    self.thread.setDaemon(True)
    self.thread.start()


  def stop(self):
    if self.thread is None:
      self.cleanup()
      return

    self.thread.stop()
    return

  # These should be overriden in the child scripts
  def execute(self):
    pass

  def cleanup(self):
    pass
