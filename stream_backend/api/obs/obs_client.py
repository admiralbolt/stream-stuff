import threading
import time

import obswebsocket
from obswebsocket.requests import *

from api.utils import image_helpers

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
        print(e)
        print("Couldn't connect, retrying")
        time.sleep(10)
    print("Connected successfully!")

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
      print(filter)
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

    This is done by starting & stopping the recording, then reading
    the written file.

    It's hacky, but the best way I've found of actually doing it.
    """
    latest_recording = image_helpers.get_latest_recording()
    self.call(StartRecording())
    result = self.call(StopRecording())
    while not result.status:
      result = self.call(StopRecording())

    # Wait until latest recording file gets written.
    for i in range(20):
      if image_helpers.get_latest_recording() != latest_recording:
        break

      if i == 19:
        print("Recording timeout, exiting.")
        self.cleanup()
        return

      time.sleep(0.025)

    latest_frame = image_helpers.get_latest_frame()
    while latest_frame is None:
      latest_frame = image_helpers.get_latest_frame()

    return latest_frame
