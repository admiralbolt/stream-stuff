import json

from django.db import models


class CustomEmote(models.Model):
  name = models.CharField(max_length=128, primary_key=True)
  url = models.CharField(max_length=128)

  def __str__(self):
    return self.name

class Sound(models.Model):
  name = models.CharField(max_length=128, unique=True)
  sound_file = models.FileField(upload_to="sounds/", blank=True)

  def __str__(self):
    return self.name

class Script(models.Model):
  name = models.CharField(max_length=128, unique=True)
  script_name = models.CharField(max_length=128, unique=True)
  auto_stop = models.BooleanField(default=True)

  def __str__(self):
    return self.name

class TwitchClip(models.Model):
  name = models.CharField(max_length=128, unique=True)
  edit_url = models.CharField(max_length=128, unique=True)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.name} - ({self.created_at})"

class KeyValue(models.Model):
  key = models.CharField(max_length=128, primary_key=True)
  # Serialized json
  value = models.TextField(blank=True)

  class Meta:
    indexes = [
      models.Index(fields=['key'])
    ]

  def __str__(self):
    return self.key



ADMIN_MODELS = [CustomEmote, KeyValue, Script, Sound, TwitchClip]
