import json

from rest_framework import serializers

from api import models


class JsonSerializer(serializers.Field):
  """Custom serializer for json fields.
  Internally json fields are represented as a string.
  Externally it's json. What the fuck did you expect?
  """

  def to_representation(self, value):
    return json.loads(value) if value else []

  def to_internal_value(self, data):
    return json.dumps(data)


class CustomEmoteSerializer(serializers.ModelSerializer):

  class Meta:
    model = models.CustomEmote
    fields = "__all__"

class KeyValueSerializer(serializers.ModelSerializer):
  """Serialize a key value pair.

  In theory we could use a json serialized field here but I've found that just
  doing the translation by hand works better.
  """

  class Meta:
    model = models.KeyValue
    fields = "__all__"


class PollSerializer(serializers.ModelSerializer):
  """Serialize a poll model."""

  class Meta:
    model = models.Poll
    fields = "__all__"


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


class TwitchClipSerializer(serializers.ModelSerializer):
  """Serialize dat boi."""

  class Meta:
    model = models.TwitchClip
    fields = "__all__"
