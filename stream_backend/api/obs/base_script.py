from api.obs.stoppable_thread import StoppableThread


class BaseScript:

  # A process variable for tracking the current execution
  thread = None

  # An OBSClient
  client = None

  def __init__(self, client):
    self.client = client
    pass

  def call(self, request):
    return self.client.socket_client.call(request)

  def start(self):
    if self.thread is not None:
      return

    self.thread = StoppableThread(target=self.execute, args=(self,))
    self.thread.setDaemon(True)
    self.thread.start()


  def stop(self):
    if self.thread is None:
      return

    self.thread.stop()
    return

  # These should be overriden in the child scripts
  def execute(self):
    pass

  def cleanup(self):
    pass
