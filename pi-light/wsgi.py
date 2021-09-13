from flask import request, Flask
from light_matrix import LightMatrix

app = Flask(__name__)

m = LightMatrix()

@app.route("/draw-image")
def draw_image():
  url = request.args.get('url')
  m.DrawImageFromUrl(url)
  return ""
