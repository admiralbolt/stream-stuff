import asyncio
import glob
import json
import os
import random
import signal
import time

from asgiref.sync import sync_to_async
from datetime import datetime
from importlib import import_module
from twitchio.ext import commands

from api.models import TwitchChatter
from api.obs.obs_client import OBSClient
from api.obs.script_manager import ScriptManager
from api.twitch_bot.commands.commands_command import CommandsCommand
from api.twitch_bot.rewards_handler import RewardsHandler
from api.utils._secrets import bot_oauth_token, client_id
from api.utils.key_value_utils import async_get_value
from api.utils.stoppable_thread import StoppableThread
from api.utils.websocket_client import WebSocketClient
from api.utils.websocket_pool import WebSocketPool


IS_BOT_ALIVE = "twitch_chat_bot_is_alive"
EMOTES_ENABLED = "twitch_chat_bot_emotes_enabled"


class AdmiralLightningBot(commands.Bot):

  def __init__(self, sound_manager):
    super().__init__(irc_token=bot_oauth_token,
                     client_id=client_id,
                     nick="admiral_lightning_bot",
                     prefix="!",
                     initial_channels=["admirallightningbolt"])
    self.websockets = WebSocketPool()
    self.sound_manager = sound_manager
    self.obs_client = OBSClient()
    self.script_manager = ScriptManager(self.obs_client, self.sound_manager)
    self.rewards_handler = RewardsHandler(self.sound_manager, self.script_manager)

    # Magical function command injection magic.
    commands_glob = os.path.join(os.getcwd(), "api", "twitch_bot", "commands", "*.py")
    for f in glob.glob(commands_glob):
      module_name = os.path.splitext(os.path.basename(f))[0]
      if module_name in ["__init__", "base_command", "commands_command"]:
        continue

      module_object = import_module(f"api.twitch_bot.commands.{module_name}")
      class_name = "".join([word.title() for word in module_name.split("_")])
      command_class = getattr(module_object, class_name)
      self.add_command(command_class(self.websockets))

    self.add_command(CommandsCommand(self.websockets, list(self.commands.keys())))

  async def event_ready(self):
    await self.websockets.initialize()
    await self.script_manager.initialize()
    oauth_token = await async_get_value("twitch_oauth_token")
    await self.pubsub_subscribe(oauth_token, "channel-points-channel-v1.83968979")
    pass

  async def event_raw_pubsub(self, data):
    if "data" not in data:
      return
    message_data = json.loads(data["data"]["message"])
    await self.rewards_handler.handle_event(message_data)

  async def send_emote(self, url):
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
    chatter, created = TwitchChatter.objects.get_or_create(username=user.name.strip())
    if created:
      chatter.latest_join = datetime.utcnow()
      chatter.save()
      return

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
    if not await async_get_value(IS_BOT_ALIVE) and False:
      return

    # Handle commands if it is a command
    await self.handle_commands(message)

    # Handle rewards if it is a custom reward
    await self.rewards_handler.handle_message(message)

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
