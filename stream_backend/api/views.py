from django.apps import apps

from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from api import models, serializers

import threading

class CustomEmoteViewSet(viewsets.ModelViewSet):
  """Custom Emotes"""
  resource_name = "customemotes"
  queryset = models.CustomEmote.objects.order_by("name")
  serializer_class = serializers.CustomEmoteSerializer


class KeyValueViewSet(viewsets.ModelViewSet):
  """Key Value Shit"""
  resource_name = "keyvalues"
  queryset = models.KeyValue.objects.order_by("key")
  serializer_class = serializers.KeyValueSerializer

class ScriptViewSet(viewsets.ModelViewSet):
  """Scripts for controlling OBS"""
  resource_name = "scripts"
  queryset = models.Script.objects.order_by("name")
  serializer_class = serializers.ScriptSerializer

class SoundViewSet(viewsets.ModelViewSet):
  """S O U N D"""
  resource_name = "sounds"
  queryset = models.Sound.objects.order_by("name")
  serializer_class = serializers.SoundSerializer

class TwitchClipViewSet(viewsets.ModelViewSet):
  """Somebody clip that."""
  resource_name = "twitchclips"
  queryset = models.TwitchClip.objects.all()
  serializer_class = serializers.TwitchClipSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def play_sound(request):
  """Play a sound."""
  try:
    sound = models.Sound.objects.get(id=request.GET.get("sound_id"))
  except ObjectDoesNotExist:
    return JsonResponse({"status": ":("})

  app_config = apps.get_app_config("api")
  if request.GET.get("stop"):
    app_config.sound_manager.stop_sound(sound.name, mic=True, headphone=True)
  else:
    app_config.sound_manager.play_sound(sound.sound_file.path, sound_name=sound.name, mic=True, headphone=True)
  return JsonResponse({"status": "cool"})

@api_view(["POST"])
def upload_sound(request):
  try:
    sound = models.Sound.objects.get(id=request.GET.get("id"))
  except ObjectDoesNotExist:
    return JsonResponse({"status": ":("})

  f = request.data["file"]
  sound.sound_file.save(f.name, f, save=True)
  return JsonResponse({"status": "cool"})

@api_view(["GET"])
@permission_classes([AllowAny])
def run_script(request):
  """Run a script."""
  app_config = apps.get_app_config("api")
  script_name = request.GET.get("script_name")
  if script_name not in app_config.scripts:
    return JsonResponse({"status": ":("})

  if request.GET.get("stop"):
    app_config.scripts[script_name].stop()
  else:
    app_config.scripts[script_name].start()

  return JsonResponse({"status": "cool"})
