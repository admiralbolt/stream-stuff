import asyncio
import sys
import os
import time

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

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)
websocket_client = WebSocketClient(7005)
loop.run_until_complete(websocket_client.connect())

loop.run_until_complete(websocket_client.send({
  "HELLO": "asdf"
}))

time.sleep(2)
