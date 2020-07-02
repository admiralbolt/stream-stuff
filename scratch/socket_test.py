import asyncio
import sys
import os
import time
import websockets

sys.path.append(os.path.realpath(os.path.join(
  os.getcwd(),
  "..",
  "stream_backend/api/utils"
)))

sys.path.append(os.path.realpath(os.path.join(
  os.getcwd(),
  "..",
  "stream_backend"
)))

from websocket_client import WebSocketClient

websocket_client = WebSocketClient(7004)
asyncio.run(websocket_client.connect(), debug=True)

async def cool():
  websocket_client = WebSocketClient(7004)
  await websocket_client.connect()

  print(websocket_client.socket.open)
  await websocket_client.send("asdf")

async def test():
  uri = "ws://localhost:7004"
  async with websockets.connect(uri) as websocket:
    print(websocket.open)
    await websocket.send("asdf")

asyncio.run(cool())
