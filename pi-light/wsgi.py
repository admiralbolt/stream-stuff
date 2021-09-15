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

def download_image(url, requester):
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

  insert_image(requester, file_path)  
  return file_path

with app.app_context():
  m.DrawImage(get_latest_image())


@app.route("/draw-image")
def draw_image():
  url = request.args.get('url')
  requester = request.args.get('requester')
  file_path = download_image(url, requester)
  m.DrawImage(file_path)
  return "OK"
