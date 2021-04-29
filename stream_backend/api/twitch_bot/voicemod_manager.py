"""A class for managing voicemod changes.

Probably isn't necessary to be completely separated but it makes nice logical
sense to do so.
"""
import keyboard
import logging
import time

from api.const import VOICEMOD_CLEAN, VOICEMOD_RANDOM
from api.utils.stoppable_thread import StoppableThread

logger = logging.getLogger(__name__)

class VoicemodManager:

  def __init__(self):
    self.thread_active = False
    self.thread = None

  def change_voice(self):
    logger.info(f"Starting voice changer thread")
    self.thread = StoppableThread(target=self.change_voice_thread)
    self.thread.start()

  def change_voice_thread(self):
    """Change to a random voice for 10 seconds."""
    self.thread_active = True
    keyboard.press(VOICEMOD_RANDOM)
    keyboard.release(VOICEMOD_RANDOM)
    time.sleep(15)
    keyboard.press(VOICEMOD_CLEAN)
    keyboard.release(VOICEMOD_CLEAN)
    time.sleep(0.5)
    self.thread_active = False
    logger.info(f"Cleaning up voice changer thread")
