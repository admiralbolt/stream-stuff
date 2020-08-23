import asyncio
import logging
import queue

from fuzzywuzzy import fuzz
from profanityfilter import ProfanityFilter

from api.const import KING_OF_THE_HILL_MESSAGE, KING_OF_THE_HILL_AUTHOR
from api.models import Sound
from api.utils.stoppable_thread import StoppableThread
from api.utils.key_value_utils import async_set_value

logger = logging.getLogger(__name__)

class RewardsHandler:
  """A class for handling purchased rewards!"""

  def __init__(self, websockets, sound_manager, script_manager):
    self.queue = queue.Queue()
    self.websockets = websockets
    self.sound_manager = sound_manager
    self.script_manager = script_manager
    self.worker_thread = None
    self.filter = ProfanityFilter()
    self.all_sounds = {
      sound.name: sound.sound_file.path
      for sound in Sound.objects.all()
    }
    self.rewards = {
      "79dcdf6f-7166-4958-8635-ba2233772008": self.sound_reward,
      "9fca547f-266a-4416-a6fe-f7ede97e4d97": self.shame_cube_reward,
      "5d02b71f-fceb-4ea8-9cca-9da2d749ebda": self.stream_message_reward,
    }
    self.start_worker()

  def start_worker(self):
    """Start the worker thread for processing the alerts queue."""
    self.worker_thread = StoppableThread(target=self.process_queue, daemon=True)
    self.worker_thread.start()

  def process_queue(self):
    """Process the alert queue, interesting logic is in async_process_queue."""
    self.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(self.loop)

    asyncio.run(self.async_process_queue())

  async def async_process_queue(self):
    """Processes message from our alert queue."""

    while not self.worker_thread.stopped():
      data = self.queue.get()
      await self.handle_reward(data)
      self.queue.task_done()
      await asyncio.sleep(0.01)

  async def handle_reward(self, data):
    """Process an individual reward.

    Rewards can come from either a pubsub message or a chat message, so we route
    by type accordingly.
    """
    await self.rewards[data["data"]["redemption"]["reward"]["id"]](data)

  async def shame_cube_reward(self, data):
    """Process a purchased shame cube reward."""
    self.script_manager.run_and_wait("shame_cube")

  async def stream_message_reward(self, data):
    """Updates the displayed stream message.

    Updates both the key value store and sends data over the websocket.
    """
    message = self.filter.censor(data["data"]["redemption"]["user_input"])
    author = data["data"]["redemption"]["user"]["display_name"]
    await async_set_value(KING_OF_THE_HILL_MESSAGE, message)
    await async_set_value(KING_OF_THE_HILL_AUTHOR, author)
    await self.websockets.king_of_the_hill.send({
      "author": author,
      "message": message
    })

  async def sound_reward(self, data):
    """Plays a custom sound.

    The sound selected matches the input message as best as possible.
    NOTE: "as best as possible" means not very well.
    """
    sound_name = sorted(
      self.all_sounds.keys(),
      key=lambda sound: fuzz.ratio(data["data"]["redemption"]["user_input"].lower(), sound.lower()),
      reverse=True
    )[0]

    self.sound_manager.play_sound(
      self.all_sounds[sound_name],
      sound_name=sound_name,
      mic=True,
      headphone=True
    )

  async def queue_event(self, data):
    reward_id = data["data"]["redemption"]["reward"]["id"]
    logger.info(f"channel event reward_id: {reward_id}")
    if reward_id not in self.rewards:
      return

    self.queue.put_nowait(data)
    return
