from rest_framework import serializers
from api import models


class SoundSerializer(serializers.ModelSerializer):
  """Serializer a sound model."""

  class Meta:
    model = models.Sound
    fields = "__all__"
