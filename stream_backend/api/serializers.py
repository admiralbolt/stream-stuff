from rest_framework import serializers
from api import models


class ScriptSerializer(serializers.ModelSerializer):
  """Serialize a script model."""

  class Meta:
    model = models.Script
    fields = "__all__"

class SoundSerializer(serializers.ModelSerializer):
  """Serialize a sound model."""

  class Meta:
    model = models.Sound
    fields = "__all__"
