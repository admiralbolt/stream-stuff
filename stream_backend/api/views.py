from django.apps import apps

from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from api import models, serializers

import threading


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


def threaded_play_sound(sound_player, sound):
  sound_player.play_sound(sound)


@api_view(["GET"])
@permission_classes([AllowAny])
def play_sound(request):
  """Play a sound."""
  try:
    sound = models.Sound.objects.get(id=request.GET.get("sound_id"))
  except ObjectDoesNotExist:
    return JsonResponse({"status": ":("})

  app_config = apps.get_app_config("api")
  t = threading.Thread(target=threaded_play_sound, args=[app_config.mic_sound_player, sound])
  t.setDaemon(True)
  t.start()

  t2 = threading.Thread(target=threaded_play_sound, args=[app_config.headphone_sound_player, sound])
  t2.setDaemon(True)
  t2.start()

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
