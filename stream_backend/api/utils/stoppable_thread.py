import threading

class StoppableThread(threading.Thread):
  """A thread that can be stopped via the stop() call.

  Note that this doesn't kill the thread but sets a
  flag on the thread. The actual execution is responsible
  for checking the stop event itself.
  """

  def __init__(self, target, args=(), daemon=True):
    super(StoppableThread, self).__init__(target=target, daemon=daemon)
    self._args = args
    self._stop_event = threading.Event()

  def stop(self):
    """Signals the thread to stop."""
    self._stop_event.set()

  def stopped(self):
    """Whether or not the thread is stopped.

    This condition should be checked within a thread execution
    instead of using something like while True.
    """
    return self._stop_event.is_set()
