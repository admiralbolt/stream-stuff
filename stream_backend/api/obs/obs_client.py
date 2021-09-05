import base64
import cv2
import io
import logging
import obswebsocket
import threading
import time

from imageio import imread
from obswebsocket.requests import *

from api.const import MAIN_SCENE

logger = logging.getLogger(__name__)

class OBSClient:
  """A high level wrapper around an obs websocket client.

  Helper methods and the like will be added here that will be used across
  many scripts.
  """

  # An obs-websocket-py client.
  socket_client = None

  # A thread that handles connecting. Retries every 10 seconds until
  # the socket becomes available.
  thread = None

  def __init__(self):
    self.socket_client = obswebsocket.obsws("localhost", 4444)
    self.thread = threading.Thread(target=self._connect)
    self.thread.setDaemon(True)
    self.thread.start()

  def __delete__(self):
    self.socket_client.disconnect()

  def _connect(self):
    while self.socket_client.ws is None or not self.socket_client.ws.connected:
      try:
        self.socket_client.connect()
      except Exception as e:
        logger.info("[obs_client.py] Couldn't connect, retrying")
        time.sleep(10)
    logger.info("[obs_client.py] Connected successfully!")

  def call(self, request):
    return self.socket_client.call(request)

  def get_source_by_name(self, name):
    """Get a source by its name.

    Returns a dict with information about the source, ex:
    {
      'name': 'Mic/Aux 2',
      'type': 'input',
      'typeId': 'wasapi_input_capture'
    }
    """
    sources = self.call(GetSourcesList())
    for source in sources.getSources():
      if source["name"] == name:
        return source
    return None

  def get_source_filter_by_name(self, source, name):
    """Get a filter by it's source & name.

    Returns a dict with information about the filter, ex:
    {
      'enabled': True,
      'name': 'Gray',
      'settings': {
        'clut_amount': 0.0,
        'image_path': 'C:/Program Files/obs-studio/data/obs-plugins/obs-filters/LUTs/grayscale.png'
      },
      'type': 'clut_filter'
    }
    """
    filters = self.call(GetSourceFilters(source["name"]))
    for filter in filters.getFilters():
      logger.info(filter)
      if filter["name"] == name:
        return filter
    return None

  def transition(self):
    """Clicks the transition button."""
    return self.call(TransitionToProgram({
      "name": "Cut",
      "duration": 0
    }))

  def get_latest_frame(self):
    """Gets the latest frame from obs.

    This is done by taking a screenshot and black magic converting back into
    an actual fucking array, fuck you opencv2.
    """
    image_response = self.call(TakeSourceScreenshot(
      sourceName=MAIN_SCENE,
      embedPictureFormat="png"
    ))
    # The decoded image data from the screenshot comes as an image uri which
    # includes the prefix data:image/png;base64,. This prefix needs to be
    # stripped in order for the binary image data to be handled correctly.
    fuck_this_prefix = "data:image/png;base64,"
    image_data = base64.b64decode(image_response.getImg()[len(fuck_this_prefix):], "-_")
    img = imread(io.BytesIO(image_data))
    latest_frame = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    return latest_frame
