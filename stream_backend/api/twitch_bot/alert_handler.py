import asyncio
import queue
import random

from asgiref.sync import sync_to_async

from api.models import Sound
from api.utils.stoppable_thread import StoppableThread

class AlertHandler:
  """Handles all twitch alerts!

  This works primarily with a mutex & queue so that alerts
  aren't processed simultaneously.
  """

  def __init__(self, websockets, sound_manager):
    self.websockets = websockets
    self.sound_manager = sound_manager
    self.queue = queue.Queue()
    self.start_worker()

  def start_worker(self):
    self.worker_thread = StoppableThread(target=self.process_queue, daemon=True)
    self.worker_thread.start()

  def process_queue(self):
    self.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(self.loop)

    asyncio.run(self.async_process_queue())

  async def async_process_queue(self):
    """Processes message from our alert queue."""

    while not self.worker_thread.stopped():
      data = self.queue.get()
      await self.handle_alert(data)
      self.queue.task_done()
      await asyncio.sleep(2)

  async def handle_alert(self, data):
    await {
      "bits_event": self.handle_bits,
      "follow_event": self.handle_follow,
      "subscribe_event": self.handle_sub
    }[data["message_type"]](data)

    await asyncio.sleep(3)

  async def handle_bits(self, data):
    """Generates an alert for bits.

    Bits data looks something like this:

    {
     'message_id': '06f40997-462e-5473-9c0c-38ada0a0f04e',
     'message_type': 'bits_event',
     'version': '1.0'
     'data':
     {
        'badge_entitlement': None,
        'bits_used': 1,
        'channel_id': '83968979',
        'channel_name': 'admirallightningbolt',
        'chat_message': 'Cheer1',
        'context': 'cheer',
        'is_anonymous': False,
        'time': '2020-08-03T18:38:56.652133092Z',
        'total_bits_used': 13,
        'user_id': '561395702',
        'user_name': 'lightningbolttest69'
      },
    }
    """
    await self.sound_manager.async_play_sound(sound_name="Boom", mic=True, headphone=True)
    await self.websockets.canvas.send({
      "type": "create",
      "id": f"emote_{random.random()}_{random.random()}",
      "html": f"<img src='https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F030%2F329%2Fcover1.jpg' />",
      "randomVelocity": True,
      "randomPosition": True,
      "timer": 3000 + random.random() * 1000
    })

  async def handle_follow(self, data):
    """Generate an alert for a new follow!

    Follow event data looks like this:
    {
      'data': [
        {
          'followed_at': '2020-08-03T18:51:54Z',
          'from_id': '561395702',
          'from_name': 'lightningbolttest69',
          'to_id': '83968979',
          'to_name': 'admirallightningbolt'
        }
      ]
    }
    """
    await self.sound_manager.async_play_sound(sound_name="Falcon Yes", mic=True, headphone=True)
    await self.websockets.canvas.send({
      "type": "create",
      "id": f"emote_{random.random()}_{random.random()}",
      "html": f"<img src='https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F030%2F329%2Fcover1.jpg' />",
      "randomVelocity": True,
      "randomPosition": True,
      "timer": 3000 + random.random() * 1000
    })

  async def handle_sub(self, data):
    pass

  async def queue_alert(self, data):
    """Puts an alert into the queue for processing.

    Data can come from a pubsub connection OR a webhook.
    """
    self.queue.put_nowait(data)
    return
