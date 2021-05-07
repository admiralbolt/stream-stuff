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
    # A websocket used to communicate spotify currently playing information.
    self.spotify = WebSocketClient(7001)
    # Controls html displayed on the splash screen.
    self.splash = WebSocketClient(7002)
    # Used to increase / decrease the size of the brain.
    self.brain = WebSocketClient(7003)
    # A blank canvas that can display any input html.
    self.canvas = WebSocketClient(7004)
    # A plugin to display a sub goal!
    self.sub_goal = WebSocketClient(7006)
    # Displays a message purchased by chat.
    self.king_of_the_hill = WebSocketClient(7007)
    # Changes my background image.
    self.background_image = WebSocketClient(7008)
    # Displays keybinding info
    self.keybind_display = WebSocketClient(7009)
    # Used to control the dvd bounce plugin.
    self.dvd_bounce = WebSocketClient(7010)

    self.all_sockets = [
      self.melee,
      self.spotify,
      self.splash,
      self.brain,
      self.canvas,
      self.sub_goal,
      self.king_of_the_hill,
      self.background_image,
      self.keybind_display,
      self.dvd_bounce
    ]

  async def initialize(self):
    """Connect ALL the websockets."""
    for socket in self.all_sockets:
      await socket.connect()
