from django.db import models

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

ADMIN_MODELS = [Script, Sound]
