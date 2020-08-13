import logging

from fuzzywuzzy import fuzz

from api.models import Sound

logger = logging.getLogger(__name__)

class RewardsHandler:
  """A class for handling purchased rewards!"""

  def __init__(self, sound_manager, script_manager):
    self.sound_manager = sound_manager
    self.script_manager = script_manager
    self.all_sounds = {
      sound.name: sound.sound_file.path
      for sound in Sound.objects.all()
    }
    self.message_rewards = {
      "79dcdf6f-7166-4958-8635-ba2233772008": self.sound_reward
    }
    self.event_rewards = {
      "9fca547f-266a-4416-a6fe-f7ede97e4d97": self.shame_cube_reward
    }

  async def handle_event(self, data):
    """Processes a pubsub message for a redeemed channel points item."""
    reward_id = data["data"]["redemption"]["reward"]["id"]
    logger.info(f"channel event reward_id: {reward_id}")
    if reward_id not in self.event_rewards:
      return

    await self.event_rewards[reward_id](data)

  async def shame_cube_reward(self, data):
    self.script_manager.run_script("shame_cube")

  async def handle_message(self, message):
    """Processes a custom reward that includes a message."""
    if not message.tags or "custom-reward-id" not in message.tags:
      return
    if message.tags["custom-reward-id"] not in self.message_rewards:
      return

    await self.message_rewards[message.tags["custom-reward-id"]](message)

  async def sound_reward(self, message):
    """Plays a custom sound.

    The sound selected matches the input message as best as possible.
    NOTE: "as best as possible" means not very well.
    """
    sound_name = sorted(
      self.all_sounds.keys(),
      key=lambda sound: fuzz.ratio(message.content.lower(), sound.lower()),
      reverse=True
    )[0]

    self.sound_manager.play_sound(
      self.all_sounds[sound_name],
      sound_name=sound_name,
      mic=True,
      headphone=True
    )
