import json
import websockets

class WebSocketClient:
  """Connects to a websocket."""

  address = None
  socket = None

  def __init__(self, port):
    self.address = f"ws://localhost:{port}"

  async def connect(self):
    """Connects to the socket!

    Defaults max_size to None so that I can send absurd amounts of data.
    """
    self.socket = await websockets.connect(self.address)
    self.socket.max_size = None

  async def close(self):
    await self.socket.close()

  async def send(self, data):
    """Send data to the socket!

    Data is json stringfied before sending.
    """
    await self.socket.send(json.dumps(data))
