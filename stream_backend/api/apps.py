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
    from api.hardware.light_manager import LightManager
    from api.obs.obs_client import OBSClient
    from api.obs.script_manager import ScriptManager
    from api.twitch_bot.bot_manager import BotManager
    from api.utils.twitch_service import TwitchService
    from api.utils.websocket_pool import WebSocketPool

    self.websockets = WebSocketPool()
    await self.websockets.initialize()

    self.spotify_service = SpotifyService(self.websockets)
    await self.spotify_service.initialize()

    self.twitch_service = TwitchService()
    await self.twitch_service.initialize()
    await self.twitch_service.setup_keybindings()

    self.sound_manager = SoundManager()
    await self.sound_manager.setup_keybindings()

    self.light_manager = LightManager()

    self.obs_client = OBSClient()
    self.script_manager = ScriptManager(self.obs_client, self.sound_manager, self.light_manager)
    await self.script_manager.initialize()
    await self.script_manager.setup_keybindings()

    self.voice_manager = VoiceManager(self.sound_manager)

    self.bot_manager = BotManager(self.sound_manager, self.twitch_service, self.light_manager)
    self.bot_manager.start()
