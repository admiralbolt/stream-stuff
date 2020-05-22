import obswebsocket, obswebsocket.requests

class OBSClient:
  """A high level wrapper around an obs websocket client.

  Helper methods and the like will be added here that will be used across
  many scripts.
  """

  # An obs-websocket-py client.
  socket_client = None


  def __init__(self, socket_client):
    self.socket_client = socket_client
    self.socket_client.connect()

  def __delete__(self):
    self.socket_client.disconnect()


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
    sources = self.call(obswebsocket.requests.GetSourcesList())
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
    filters = self.call(obswebsocket.requests.GetSourceFilters(source["name"]))
    for filter in filters.getFilters():
      print(filter)
      if filter["name"] == name:
        return filter
    return None
