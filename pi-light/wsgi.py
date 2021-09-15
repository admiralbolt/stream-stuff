import magic
import os
import requests
import sqlite3
import threading
import time

from flask import g, request, Flask
from light_matrix import LightMatrix
from mimetypes import guess_extension

DATABASE = "/home/pi/git/stream-stuff/pi-light/images.db"
IMAGE_FOLDER = "/home/pi/git/stream-stuff/pi-light/images/"

app = Flask(__name__)
m = LightMatrix()

def get_db():
  db = getattr(g, '_database', None)
  if db is None:
    db = g._database = sqlite3.connect(DATABASE)
  return db

@app.teardown_appcontext
def close_connection(exception):
  db = getattr(g, '_database', None)
  if db is not None:
    db.close()

def init_db():
  with app.app_context():
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
      db.cursor().executescript(f.read())
    db.commit()

def insert_image(uploader, file_path):
  sql = "INSERT INTO images(uploaded_by, file_path) VALUES(?, ?)"
  db = get_db()
  db.cursor().execute(sql, (uploader, file_path))
  db.commit()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def get_latest_image():
  query = "SELECT * FROM images ORDER BY uploaded DESC LIMIT 1"
  cursor = get_db().execute(query)
  return cursor.fetchone()[3]

# Copy pasting from stoppable_thread, I"m sure there"s a better way.
# But I"m lazy.
class StoppableThread(threading.Thread):
  """A thread that can be stopped via the stop() call.

  Note that this doesn"t kill the thread but sets a
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


gif_thread = None

def pretty_name(url, content_type):
  name = os.path.basename(url)
  fname, ext = os.path.splitext(name)
  if not ext:
    ext = guess_extension(content_type)
  timestamp = str(time.time()).split(".")[0]

  return f"{fname}_{timestamp}{ext}"

VALID_CONTENT_TYPES = [
  "image/gif",
  "image/jpg",
  "image/jpeg",
  "image/png"
]

def download_image(url):
  """Downloads an image from the interwebs.

  Also identifies the type of the image.
  """
  response = requests.get(url)
  content_type = response.headers["Content-Type"]
  if content_type not in VALID_CONTENT_TYPES:
    print(f"{url} is not a valid image.")
    return

  file_path = os.path.join(IMAGE_FOLDER, pretty_name(url, content_type))
  with open(file_path, "wb") as wh:
    wh.write(response.content)

  insert_image("asdf", file_path)  
  return file_path

def render_gif(frames):
  global gif_thread
  global m
  while not gif_thread.stopped():
    for frame in frames:
      if gif_thread.stopped():
        break
      m.DrawMatrix(frame)
      time.sleep(0.09)

def display_image(file_path):
  global gif_thread
  if gif_thread:
    gif_thread.stop()
    time.sleep(0.1)
  image_type = magic.from_file(file_path, mime=True)
  if image_type == "image/gif":
    frames = m.GetGifFrames(file_path)
    gif_thread = StoppableThread(target=render_gif, args=(frames,), daemon=True)
    gif_thread.start()
    return     
 
  # Otherwise, it ain"t no giffy.
  m.DrawImage(file_path)
 
with app.app_context():
  display_image(get_latest_image())


@app.route("/draw-image")
def draw_image():
  url = request.args.get('url')
  file_path = download_image(url)
  display_image(file_path)
  return "OK"
