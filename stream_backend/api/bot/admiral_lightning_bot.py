import asyncio
import glob
from importlib import import_module
import os
import random
import signal
import time

from asgiref.sync import sync_to_async
from twitchio.ext import commands

from api.bot.commands import *
from api.utils._secrets import bot_oauth_token, client_id
from api.utils.stoppable_thread import StoppableThread
from api.utils.websocket_client import WebSocketClient


IS_BOT_ALIVE = "twitch_chat_bot_is_alive"
EMOTES_ENABLED = "twitch_chat_bot_emotes_enabled"

class BotManager:

  loop = None
  thread = None
  bot = None

  def run(self):
    self.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(self.loop)

    self.bot = AdmiralLightningBot()
    # This is sync and blocking, it runs forever until we stop it.
    self.bot.run()

  def start(self):
    self.thread = StoppableThread(target=self.run)
    self.thread.start()

  def stop(self):
    self.bot.stop()
    self.thread.stop()
    self.bot._ws.should_listen = False

class AdmiralLightningBot(commands.Bot):

  def __init__(self):
    super().__init__(irc_token=bot_oauth_token,
                     client_id=client_id,
                     nick="admiral_lightning_bot",
                     prefix="!",
                     initial_channels=["admirallightningbolt"])
    self.websocket_client = WebSocketClient(7004)

    # Magical function command injection magic.
    commands_glob = os.path.join(os.getcwd(), "api", "bot", "commands", "*.py")
    for f in glob.glob(commands_glob):
      module_name = os.path.splitext(os.path.basename(f))[0]
      if module_name == "__init__" or module_name == "base_command":
        continue

      module_object = import_module(f"api.bot.commands.{module_name}")
      class_name = "".join([word.title() for word in module_name.split("_")])
      command_class = getattr(module_object, class_name)
      self.add_command(command_class())

  async def event_ready(self):
    await self.websocket_client.connect()

  async def send_emote(self, url):
    await self.websocket_client.send({
      "type": "create",
      "id": f"emote_{random.random()}_{random.random()}",
      "html": f"<img src='{url}' />",
      "randomVelocity": True,
      "randomPosition": True,
      "timer": 3000 + random.random() * 1000
    })

  async def event_message(self, message):
    from api.utils.key_value_utils import get_value
    if not get_value(IS_BOT_ALIVE) and False:
      return

    # Handle commands if it is a command
    await self.handle_commands(message)

    # Display emotes if it is an emote.
    if get_value(EMOTES_ENABLED) or True:
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

  # @commands.command(name="test")
  # async def test_command(self, ctx):
  #   await ctx.send(f"Hello {ctx.author.name}!")
