import asyncio
import os

from django.apps import AppConfig


class ApiConfig(AppConfig):
  """Pretty much all my system wide config stuff.

  This includes a bunch of startup code because of the ready() hook.
  """
  name = 'api'

  def ready(self):
    # Don't double run.
    if os.environ.get('RUN_MAIN', None) != 'true':
      return

    asyncio.run(self.initialize())

  async def initialize(self):
    # Imports need to be here to avoid a registry error.
    # It's technically only related to model imports but eh.
    from api.audio.sound_manager import SoundManager
    from api.audio.spotify_service import SpotifyService
    from api.audio.voice_manager import VoiceManager
    from api.obs.obs_client import OBSClient
    from api.obs.script_manager import ScriptManager
    from api.twitch_bot.bot_manager import BotManager
    from api.utils.poll_manager import PollManager
    from api.utils.websocket_pool import WebSocketPool

    # Setup WebSocketPool
    self.websockets = WebSocketPool()
    await self.websockets.initialize()

    self.spotify_service = SpotifyService(self.websockets)
    await self.spotify_service.initialize()

    # Setup SoundBoard
    self.sound_manager = SoundManager()
    await self.sound_manager.setup_keybindings()

    # Setup OBSWebsocket & Scripts
    self.obs_client = OBSClient()
    self.script_manager = ScriptManager(self.obs_client, self.sound_manager)
    await self.script_manager.initialize()
    await self.script_manager.setup_keybindings()

    # VOICE MANAGER
    # Fuck you admiral lightning bot
    # self.voice_manager = VoiceManager(self.sound_manager)
    # self.voice_manager.start_listening()

    # POLLS
    self.poll_manager = PollManager()

    self.bot_manager = BotManager(self.sound_manager)
    self.bot_manager.start()
