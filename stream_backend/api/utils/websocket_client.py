import asyncio
import json
import websockets

class WebSocketClient:
  """Connects to a websocket."""

  address = None
  socket = None

  def __init__(self, port):
    self.address = f"ws://localhost:{port}"

  async def connect(self, timeout=10, max_retries=3):
    """Connects to the socket!

    Defaults max_size to None so that I can send absurd amounts of data.
    """
    attempt = 1
    while not self.socket and attempt <= max_retries:
      try:
        self.socket = await websockets.connect(self.address)
      except Exception as e:
        print(f"Couldn't connect to {address} on attempt #{attempt}.")
        print(e)
      attempt += 1
    if self.socket:
      self.socket.max_size = None
      print(f"Connected succesfully to {self.address}")
    else:
      print(f"Could not connect to to {self.address}")

  async def close(self):
    await self.socket.close()

  async def send(self, data):
    """Send data to the socket!

    Data is json stringified before sending.
    """
    await self.socket.send(json.dumps(data))
