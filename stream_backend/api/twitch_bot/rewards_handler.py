import asyncio
import logging
import queue

from bs4 import BeautifulSoup
from fuzzywuzzy import fuzz
from profanityfilter import ProfanityFilter

from api.const import BACKGROUND_IMAGE_URL, KING_OF_THE_HILL_MESSAGE, KING_OF_THE_HILL_AUTHOR
from api.models import Sound
from api.twitch_bot.emote_utils import replace_emotes_in_message
from api.utils.unsplash import get_random_photo_url
from api.utils.stoppable_thread import StoppableThread
from api.utils.key_value_utils import async_set_value

logger = logging.getLogger(__name__)

class Reward:
  """A data wrapper class for holding stuff we care about for rewards.

  This is to make handling pubsub messages vs. chat message rewards streamlined.
  """

  def __init__(self, reward_id, message=None, author=None, emotes=None):
    self.reward_id = reward_id
    self.message = message
    self.author = author
    self.emotes = emotes

  def __repr__(self):
    return f"{self.reward_id}: (message: {self.message}, author: {self.author}, emotes: {self.emotes}"

class RewardsHandler:
  """A class for handling purchased rewards!"""

  def __init__(self, websockets, sound_manager, script_manager, light_manager, me_bot):
    self.queue = queue.Queue()
    self.websockets = websockets
    self.sound_manager = sound_manager
    self.script_manager = script_manager
    self.light_manager = light_manager
    self.me_bot = me_bot
    self.worker_thread = None
    self.filter = ProfanityFilter()
    self.all_sounds = {
      sound.name: sound.sound_file.path
      for sound in Sound.objects.filter(private=False)
    }
    self.rewards = {
      "79dcdf6f-7166-4958-8635-ba2233772008": self.sound_reward,
      "9fca547f-266a-4416-a6fe-f7ede97e4d97": self.shame_cube_reward,
      "5d02b71f-fceb-4ea8-9cca-9da2d749ebda": self.stream_message_reward,
      "529d7869-0bea-4503-9eba-0c59e9943782": self.scramble_camera_reward,
      "63438f03-3cea-4461-b7f3-dce44ba5c7da": self.grant_vip_reward,
      "ba256777-1cbc-4730-9b5c-0e16a1fd1086": self.revoke_vip_reward,
      "173af3e8-2bc0-4a52-adff-91c47c3e891a": self.change_light_color_reward,
      "53bf2ef4-0cbb-4cd6-b4e8-55c1c731c31a": self.light_wave_reward,
      "ac385b50-5be0-49da-bb6a-c95b9d18d9b2": self.change_background_image_reward
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
      reward = self.queue.get()
      await self.handle_reward(reward)
      self.queue.task_done()
      await asyncio.sleep(0.01)

  async def handle_reward(self, reward):
    """Process an individual reward."""
    await self.rewards[reward.reward_id](reward)

  async def shame_cube_reward(self, reward):
    """Process a purchased shame cube reward."""
    self.script_manager.run_and_wait("shame_cube")

  async def scramble_camera_reward(self, reward):
    """Scrambles the camera filter settings.

    Note that in this case we don't want to use the run_and_wait api.
    """
    self.script_manager.run_script("scramble_camera_filter")

  async def change_background_image_reward(self, reward):
    """Changes the background image."""
    url = get_random_photo_url(reward.message)
    if not url:
      return

    await async_set_value(BACKGROUND_IMAGE_URL, url)
    await self.websockets.background_image.send({"imageUrl": url})


  async def change_light_color_reward(self, reward):
    """Changes the light color of my smart lights."""
    self.light_manager.set_color_fuzzy(reward.message)

  async def light_wave_reward(self, reward):
    """L I G H T W A V E."""
    self.light_manager.set_waveform_fuzzy(reward.message)

  async def stream_message_reward(self, reward):
    """Updates the displayed stream message.

    Updates both the key value store and sends data over the websocket.
    """
    soup = BeautifulSoup(reward.message, features="html.parser")
    stripped = soup.get_text()
    message = replace_emotes_in_message(self.filter.censor(stripped), reward.emotes, size=1.0)
    await async_set_value(KING_OF_THE_HILL_MESSAGE, message)
    await async_set_value(KING_OF_THE_HILL_AUTHOR, reward.author)

    await self.websockets.king_of_the_hill.send({
      "author": reward.author,
      "message": message
    })

  async def sound_reward(self, reward):
    """Plays a custom sound.

    The sound selected matches the input message as best as possible.
    NOTE: "as best as possible" means not very well.
    """
    sound_name = sorted(
      self.all_sounds.keys(),
      key=lambda sound: fuzz.ratio(reward.message.lower(), sound.lower()),
      reverse=True
    )[0]

    self.sound_manager.play_sound(
      self.all_sounds[sound_name],
      sound_name=sound_name,
      mic=True,
      headphone=True
    )

  async def grant_vip_reward(self, reward):
    """Give 'em VIP."""
    await self.me_bot.send_message(f"/vip {reward.author}")

  async def revoke_vip_reward(self, reward):
    """Take their VIP away."""
    await self.me_bot.send_message(f"/unvip {reward.message.lower()}")

  async def queue_from_pubsub(self, data):
    """Queue a reward from pubsub.

    If the reward has user_input associated with it, skip it. That will be
    handled by queue_from_message.
    """
    if "user_input" in data["data"]["redemption"]:
      return

    reward = Reward(
      data["data"]["redemption"]["reward"]["id"],
      author=data["data"]["redemption"]["user"]["login"]
    )
    logger.info(reward)
    if reward.reward_id not in self.rewards:
      return

    self.queue.put_nowait(reward)
    return

  async def queue_from_message(self, message):
    """Queues a reward from a message.

    This is handled separately so we have easy access to emotes.
    """
    reward = Reward(
      message.tags["custom-reward-id"],
      author=message.author.name,
      message=message.content,
      emotes=message.tags.get("emotes")
    )
    self.queue.put_nowait(reward)
    return
