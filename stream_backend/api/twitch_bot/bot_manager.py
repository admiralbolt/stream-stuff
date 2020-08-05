import asyncio

from api.twitch_bot.admiral_lightning_bot import AdmiralLightningBot
from api.utils.stoppable_thread import StoppableThread
from api.utils.websocket_client import WebSocketClient

class BotManager:
  """Wrapper class that handles starting & stopping the twitch chat bot."""

  loop = None
  thread = None
  bot = None

  def __init__(self, sound_manager, twitch_service):
    self.sound_manager = sound_manager
    self.twitch_service = twitch_service
    return

  def run(self):
    self.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(self.loop)

    self.bot = AdmiralLightningBot(self.sound_manager, self.twitch_service)
    # This is sync and blocking, it runs forever until we stop it.
    self.bot.run()

  def start(self):
    self.thread = StoppableThread(target=self.run, daemon=True)
    self.thread.start()

  def stop(self):
    if self.bot:
      self.bot.stop()
    if self.thread:
      self.thread.stop()
