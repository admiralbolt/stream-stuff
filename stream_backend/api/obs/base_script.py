from api.utils.stoppable_thread import StoppableThread

CONSTANTS = {
  "CAMERA_SOURCE": "Shitty Webcam",
  "MIC_SOURCE": "Mic/Aux",
  "DESKTOP_AUDIO_SOURCE": "Mic/Aux 2"
}


class BaseScript:

  # A process variable for tracking the current execution
  thread = None

  # An OBSClient
  client = None

  # Sound players for mic / headphone sounds
  mic_player = None
  headphone_player = None

  def __init__(self, client, mic_sound_player, headphone_sound_player, stream_sound_player):
    self.client = client
    self.mic_sound_player = mic_sound_player
    self.headphone_sound_player = headphone_sound_player
    self.stream_sound_player = stream_sound_player
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
