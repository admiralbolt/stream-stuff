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
        self.socket = await asyncio.wait_for(websockets.connect(self.address), timeout=timeout)
      except asyncio.TimeoutError:
        print(f"Couldn't connect to {address} on attempt #{attempt}.")
        attempt += 1
    self.socket.max_size = None

  async def close(self):
    await self.socket.close()

  async def send(self, data):
    """Send data to the socket!

    Data is json stringified before sending.
    """
    await self.socket.send(json.dumps(data))
