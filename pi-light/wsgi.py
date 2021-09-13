import os
import threading
import time

from flask import request, Flask
from light_matrix import LightMatrix


# Copy pasting from stoppable_thread, I'm sure there's a better way.
# But I'm lazy.
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

app = Flask(__name__)

m = LightMatrix()

gif_thread = None

def render_gif(frames):
  global gif_thread
  global m
  while not gif_thread.stopped():
    for frame in frames:
      if gif_thread.stopped():
        break
      m.DrawMatrix(frame)
      time.sleep(0.09)

@app.route("/draw-image")
def draw_image():
  global gif_thread
  if gif_thread:
    gif_thread.stop()
    time.sleep(0.1)
  url = request.args.get('url')
  is_gif, frames = m.DrawImageFromUrl(url)
  if is_gif:
    gif_thread = StoppableThread(target=render_gif, args=(frames,), daemon=True)
    gif_thread.start()

  return ""
