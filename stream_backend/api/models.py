import json

from django.db import models


class CustomEmote(models.Model):
  """Custom Emotes that are displayed on the overlay canvas.

  Emotes are displayed when typed in chat, techincally I can add
  non twitch emotes, but I"m just using it for Better Twitch Tv
  Emotes currently.
  """
  name = models.CharField(max_length=128, primary_key=True)
  url = models.CharField(max_length=128)

  def __str__(self):
    return self.name

class KeyValue(models.Model):
  """Generic key value store.

  Used for lots of data on the frontend & backend. Easy way
  to store stuff that doesn"t deserve its own table.
  """
  key = models.CharField(max_length=128, primary_key=True)
  # Serialized json
  value = models.TextField(blank=True)

  class Meta:
    indexes = [
      models.Index(fields=["key"])
    ]

  def __str__(self):
    return self.key

class Script(models.Model):
  """Scripts that do stuff, generally memes."""
  name = models.CharField(max_length=128, unique=True)
  script_name = models.CharField(max_length=128, unique=True)
  auto_stop = models.BooleanField(default=True)

  def __str__(self):
    return self.name

class Sound(models.Model):
  """Sounds for the sound board."""
  name = models.CharField(max_length=128, unique=True)
  sound_file = models.FileField(upload_to="sounds/", blank=True)
  private = models.BooleanField(default=False)

  class Meta:
    indexes = [
      models.Index(fields=["private"])
    ]

  def __str__(self):
    return self.name

class TwitchChatter(models.Model):
  """A record of the latest join / disconnect of a twitch user."""
  username = models.CharField(max_length=64, primary_key=True)
  latest_join = models.DateTimeField(blank=True, null=True)
  latest_part = models.DateTimeField(blank=True, null=True)

  def __str__(self):
    return self.username

class TwitchClip(models.Model):
  """Clips that Admiral Lightning Bot has clipped."""
  name = models.CharField(max_length=128, unique=True)
  edit_url = models.CharField(max_length=128, unique=True)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.name} - ({self.created_at})"


ADMIN_MODELS = [CustomEmote, KeyValue, Script, Sound, TwitchClip, TwitchChatter]
