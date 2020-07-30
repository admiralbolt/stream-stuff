import atexit
import signal
import sys

from django.apps import apps
from django.contrib.staticfiles.management.commands.runserver import Command as StaticfilesRunserverCommand

class Command(StaticfilesRunserverCommand):

  def __init__(self, *args, **kwargs):
    atexit.register(self._exit)
    signal.signal(signal.SIGINT, self._handle_SIGINT)
    super(Command, self).__init__(*args, **kwargs)

  def _exit(self):
    app_config = apps.get_app_config("api")
    if hasattr(app_config, "bot_manager"):
      app_config.bot_manager.stop()
    return

  def _handle_SIGINT(self, signal, frame):
    self._exit()
    sys.exit(0)
