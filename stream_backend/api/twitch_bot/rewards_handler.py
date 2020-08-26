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

  def __init__(self, websockets, sound_manager, script_manager, me_bot):
    self.queue = queue.Queue()
    self.websockets = websockets
    self.sound_manager = sound_manager
    self.script_manager = script_manager
    self.me_bot = me_bot
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
      "529d7869-0bea-4503-9eba-0c59e9943782": self.scramble_camera_reward,
      "63438f03-3cea-4461-b7f3-dce44ba5c7da": self.grant_vip_reward,
      "ba256777-1cbc-4730-9b5c-0e16a1fd1086": self.revoke_vip_reward
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

  async def scramble_camera_reward(self, data):
    """Scrambles the camera filter settings.

    Note that in this case we don't want to use the run_and_wait api.
    """
    self.script_manager.run_script("scramble_camera_filter")

  async def stream_message_reward(self, data):
    """Updates the displayed stream message.

    Updates both the key value store and sends data over the websocket.
    """
    message = self.filter.censor(data["data"]["redemption"]["user_input"])
    author = data["data"]["redemption"]["user"]["login"]
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

  async def grant_vip_reward(self, data):
    author = data["data"]["redemption"]["user"]["login"]
    await self.me_bot.send_message(f"/vip {author}")

  async def revoke_vip_reward(self, data):
    target = data["data"]["redemption"]["user_input"].lower()
    await self.me_bot.send_message(f"/unvip {target}")

  async def queue_event(self, data):
    reward_id = data["data"]["redemption"]["reward"]["id"]
    logger.info(f"channel event reward_id: {reward_id}")
    if reward_id not in self.rewards:
      return

    self.queue.put_nowait(data)
    return
