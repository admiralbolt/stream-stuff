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
from api._secrets import ME_OAUTH_TOKEN, IFTTT_SECRET, PUBLIC_IP, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET
from api.utils.key_value_utils import async_get_value
from api.utils.stoppable_thread import StoppableThread
from api.utils.websocket_client import WebSocketClient
from api.utils.websocket_pool import WebSocketPool

logger = logging.getLogger(__name__)


class MeBot(commands.Bot):

  def __init__(self):
    super().__init__(irc_token=ME_OAUTH_TOKEN,
                     client_id=TWITCH_CLIENT_ID,
                     client_secret=TWITCH_CLIENT_SECRET,
                     nick="admirallightningbolt",
                     prefix="!",
                     initial_channels=["admirallightningbolt"])

  async def send_message(self, message):
    """Sends a message to the chat as ME!

    That's right. So much power."""
    await self._ws.send_privmsg("admirallightningbolt", content=message)
