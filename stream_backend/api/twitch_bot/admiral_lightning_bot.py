import asyncio
import glob
import json
import logging
import os
import random
import signal
import time

from asgiref.sync import sync_to_async
from datetime import datetime
from importlib import import_module
from twitchio.enums import WebhookMode
from twitchio.ext import commands
from twitchio.webhook import UserFollows

from api.const import THE_BEST_TWITCH_STREAMER_ID_NO_BIAS, TWITCH_ACCESS_TOKEN
from api.models import TwitchChatter
from api.obs.obs_client import OBSClient
from api.obs.script_manager import ScriptManager
from api.twitch_bot.alert_handler import AlertHandler
from api.twitch_bot.commands.commands_command import CommandsCommand
from api.twitch_bot.rewards_handler import RewardsHandler
from api._secrets import BOT_OAUTH_TOKEN, IFTTT_SECRET, PUBLIC_IP, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET
from api.utils.key_value_utils import async_get_value
from api.utils.stoppable_thread import StoppableThread
from api.utils.websocket_client import WebSocketClient
from api.utils.websocket_pool import WebSocketPool

logger = logging.getLogger(__name__)

IS_BOT_ALIVE = "twitch_chat_bot_is_alive"
EMOTES_ENABLED = "twitch_chat_bot_emotes_enabled"

TOPIC_BITS = f"channel-bits-events-v2.{THE_BEST_TWITCH_STREAMER_ID_NO_BIAS}"
TOPIC_POINTS = f"channel-points-channel-v1.{THE_BEST_TWITCH_STREAMER_ID_NO_BIAS}"
TOPIC_SUBS = f"channel-subscribe-events-v1.{THE_BEST_TWITCH_STREAMER_ID_NO_BIAS}"


class AdmiralLightningBot(commands.Bot):

  def __init__(self, sound_manager, twitch_service, me_bot):
    super().__init__(irc_token=BOT_OAUTH_TOKEN,
                     client_id=TWITCH_CLIENT_ID,
                     client_secret=TWITCH_CLIENT_SECRET,
                     nick="admiral_lightning_bot",
                     prefix="!",
                     initial_channels=["admirallightningbolt"],
                     external_host=f"http://{PUBLIC_IP}",
                     port=6969,
                     webhook_server=True,
                     callback="611d189f08cc4e56b8d610c96fd3da08")
    self.websockets = WebSocketPool()
    self.me_bot = me_bot
    self.sound_manager = sound_manager
    self.twitch_service = twitch_service
    self.obs_client = OBSClient()
    self.script_manager = ScriptManager(self.obs_client, self.sound_manager)
    self.rewards_handler = RewardsHandler(self.websockets, self.sound_manager, self.script_manager, self.me_bot)
    self.alert_handler = AlertHandler(self.websockets, self.sound_manager, self.script_manager)
    self.resub_thread = StoppableThread(target=self.resub)
    self.resub_thread.start()

    # Magical function command injection magic.
    commands_glob = os.path.join(os.getcwd(), "api", "twitch_bot", "commands", "*.py")
    for f in glob.glob(commands_glob):
      module_name = os.path.splitext(os.path.basename(f))[0]
      if module_name in ["__init__", "base_command", "commands_command"]:
        continue

      module_object = import_module(f"api.twitch_bot.commands.{module_name}")
      class_name = "".join([word.title() for word in module_name.split("_")])
      command_class = getattr(module_object, class_name)
      self.add_command(command_class(self.websockets, self.twitch_service))

    self.add_command(CommandsCommand(self.websockets, self.twitch_service, list(self.commands.keys())))

  def resub(self):
    asyncio.run(self.async_resub())

  async def async_resub(self):
    while not self.resub_thread.stopped():
      await asyncio.sleep(60 * 45)
      oauth_token = await async_get_value(TWITCH_ACCESS_TOKEN)

      await self.pubsub_subscribe(oauth_token, TOPIC_BITS)
      await self.pubsub_subscribe(oauth_token, TOPIC_POINTS)
      await self.pubsub_subscribe(oauth_token, TOPIC_SUBS)

  async def event_ready(self):
    """Called when the bot is logged in.

    This finializes initialization of the websockets & scripts.
    As well as subscribes to any twitch topics.
    """
    await self.websockets.initialize()
    await self.script_manager.initialize()
    oauth_token = await async_get_value(TWITCH_ACCESS_TOKEN)

    await self.pubsub_subscribe(oauth_token, TOPIC_BITS)
    await self.pubsub_subscribe(oauth_token, TOPIC_POINTS)
    await self.pubsub_subscribe(oauth_token, TOPIC_SUBS)

    await self.modify_webhook_subscription(
      mode=WebhookMode.subscribe,
      topic=UserFollows(to_id=THE_BEST_TWITCH_STREAMER_ID_NO_BIAS),
      lease_seconds=60 * 60 * 24
    )

  async def event_webhook(self, data):
    """Fires whenever we receive a webhook message."""
    # Check for a message from IFTTT
    if "secret" in data and data["secret"] == IFTTT_SECRET:
      logger.info(data["event_type"])
    # Check for a follow event.
    if "data" in data and len(data["data"]) > 0 and "followed_at" in data["data"][0]:
      data["message_type"] = "follow_event"
      await self.alert_handler.queue_alert(data)

  async def event_raw_pubsub(self, data):
    """Fires whenever we receive an event from pubsub.

    Currently this handles:
    1. Channel Point Redemptions (without a message)
    2. Subscription Events
    3. Bit purchases
    """
    if "data" not in data:
      return
    message_data = json.loads(data["data"]["message"])
    logger.info(f"[event_raw_pubsub] {message_data}")
    await {
      TOPIC_POINTS: self.rewards_handler.queue_event,
      TOPIC_BITS: self.alert_handler.queue_alert,
      TOPIC_SUBS: self.alert_handler.queue_sub
    }[data["data"]["topic"]](message_data)

  async def send_emote(self, url):
    """Sends an emote to a random position with a random direction to the cavnas."""
    await self.websockets.canvas.send({
      "type": "create",
      "id": f"emote_{random.random()}_{random.random()}",
      "html": f"<img src='{url}' />",
      "randomVelocity": True,
      "randomPosition": True,
      "timer": 3000 + random.random() * 1000
    })

  @sync_to_async
  def update_latest_part(self, user):
    chatter, created = TwitchChatter.objects.get_or_create(username=user.name.strip())
    chatter.latest_part = datetime.utcnow()
    chatter.save()
    return

  async def event_part(self, user):
    await self.update_latest_part(user)

  @sync_to_async
  def update_latest_join(self, user):
    """Updates the DB with a twitch users latest join time.

    Use UTC time for everything because I'm lazy.
    NOTE: By lazy, I mean that there is no way of getting a
          twitch chatters time zone, so localization is impossible.
    """
    chatter, created = TwitchChatter.objects.get_or_create(username=user.name.strip())
    if created:
      chatter.latest_join = datetime.utcnow()
      chatter.save()
      return

    # We only want to update the latest join if it's a join after
    # a leave. We could end up in a scenario where the bot restarts
    # and gets a duplicate join for the same person even though they
    # never left the chatroom.
    if chatter.latest_part and datetime.utcnow() > chatter.latest_part:
      chatter.latest_join = datetime.utcnow()
      chatter.save()

  async def event_join(self, user):
    """Event that fires when a user joins the IRC channel.

    This can be very delayed, batched, and can fire if the bot
    joins the channel after a user does.
    """
    await self.update_latest_join(user)

  async def event_message(self, message):
    """Event that fires anytime a PRIVMSG is received from twitch.

    This handles:
    1. All commands and their execution.
    2. Sending emotes to the overlay canvas.
    3. Other fun easter eggs.
    """
    # Handle commands if it is a command
    await self.handle_commands(message)

    # Display emotes if it is an emote.
    if await async_get_value(EMOTES_ENABLED) or True:
      if message.tags and "emotes" in message.tags and message.tags["emotes"]:
        # Emotes get returned in the format
        # ID1:start-end,start-end/ID2:start-end...
        for emote_string in message.tags["emotes"].split("/"):
          emote_id, _ = emote_string.split(":")
          for _ in range(len(emote_string.split(","))):
            await self.send_emote(f"https://static-cdn.jtvnw.net/emoticons/v1/{emote_id}/1.0")

      # BTTV Emotes
      for word in message.content.split():
        emote = await self.get_bttv_emote(word)
        if not emote:
          continue

        await self.send_emote(emote.url)

    # Nice
    if "69" in message.content:
      context = await self.get_context(message)
      await context.send(f"@{context.author.name} nice")

  @sync_to_async
  def get_bttv_emote(self, word):
    """Wrapper for getting emotes to be used in an async context.

    Returns None if no matching emote is found."""
    from api.models import CustomEmote
    try:
      emote = CustomEmote.objects.get(name=word)
      return emote
    except:
      return None
