from api.utils.websocket_client import WebSocketClient

class WebSocketPool:
  """A class that initializes and wraps all websockets.

  The existing python websocket library has really good
  support for concurrency, and we know all the sockets
  ahead of time, so we may as well construct singleton
  clients and reuse them across the app.

  Despite being a websocket the ObsClient is handled
  separately since it's use pattern doesn't match the
  rest of the sockets.
  """

  def __init__(self):
    self.melee = WebSocketClient(7000)
    self.spotify = WebSocketClient(7001)
    self.splash = WebSocketClient(7002)
    self.brain = WebSocketClient(7003)
    self.canvas = WebSocketClient(7004)
    self.poll = WebSocketClient(7005)

    self.all_sockets = [
      self.melee,
      self.spotify,
      self.splash,
      self.brain,
      self.canvas,
      self.poll
    ]

  async def initialize(self):
    """Connect ALL the websockets."""
    for socket in self.all_sockets:
      await socket.connect()
