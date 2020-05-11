from django.apps import apps

from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from api import models, serializers


class SoundViewSet(viewsets.ModelViewSet):
  """S O U N D"""
  resource_name = "sounds"
  queryset = models.Sound.objects.order_by("name")
  serializer_class = serializers.SoundSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def play_sound(request):
  """Play a sound."""
  try:
    sound = models.Sound.objects.get(id=request.GET.get("sound_id"))
  except ObjectDoesNotExist:
    return JsonResponse({"status": "No sound found"})

  app_config = apps.get_app_config('api')
  app_config.mic_sound_player.play_sound(sound)
  app_config.headphone_sound_player.play_sound(sound)

  # play our sound here yikes

  return JsonResponse({"status": "cool"})
