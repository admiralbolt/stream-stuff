import asyncio
import time

from api.twitch_bot.admiral_lightning_bot import AdmiralLightningBot
from api.twitch_bot.me_bot import MeBot
from api.utils.stoppable_thread import StoppableThread
from api.utils.websocket_client import WebSocketClient

class BotManager:
  """Wrapper class that handles starting & stopping the twitch chat bot."""

  loop = None
  thread = None
  me_thread = None
  bot = None

  def __init__(self, sound_manager, twitch_service, light_manager):
    self.sound_manager = sound_manager
    self.twitch_service = twitch_service
    self.light_manager = light_manager
    return

  def run(self):
    self.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(self.loop)

    self.bot = AdmiralLightningBot(self.sound_manager, self.twitch_service, self.light_manager, self.me_bot)
    # This is sync and blocking, it runs forever until we stop it.
    self.bot.run()

  def me_run(self):
    self.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(self.loop)

    self.me_bot = MeBot()
    # This is sync and blocking, it runs forever until we stop it.
    self.me_bot.run()

  def start(self):
    self.me_thread = StoppableThread(target=self.me_run, daemon=True)
    self.me_thread.start()
    # Normally, using time sleep to avoid race conditions is a terrible idea,
    # but me good programmer so okay.
    time.sleep(0.2)

    self.thread = StoppableThread(target=self.run, daemon=True)
    self.thread.start()

  def stop(self):
    if self.thread:
      self.thread.stop()
