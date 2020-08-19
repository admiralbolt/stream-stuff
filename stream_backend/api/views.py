import json
import logging
import threading

from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from fuzzywuzzy import fuzz
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from api import models, serializers
from api._secrets import IFTTT_SECRET
from api.const import SPOTIFY_AUTHORIZATION_CODE, SPOTIFY_SHOULD_POLL, TWITCH_AUTHORIZATION_CODE
from api.utils.key_value_utils import get_value, set_value

logger = logging.getLogger(__name__)


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

class PollViewSet(viewsets.ModelViewSet):
  """Poll shit"""
  resource_name = "polls"
  queryset = models.Poll.objects.order_by("title")
  serializer_class = serializers.PollSerializer

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

@api_view(["POST"])
@permission_classes([AllowAny])
def ifttt(request):
  """IFTTT Webhook handling.

  See ifttt.com for config for the webhooks.
  """
  data = json.loads(request.body.decode("utf-8"))
  if "event_type" not in data or data["secret"] != IFTTT_SECRET:
    return JsonResponse({"status": "get out of here hacker."})

  app_config = apps.get_app_config("api")
  if data["event_type"] == "clip_that":
    # Clip That...
    app_config.twitch_service.clip_that()
  elif data["event_type"] == "soundboard":
    # Activate sound board sound.....
    #
    # So there is an option to preload here so we don't make a db request
    # every time the soundboard is used, but that wouldn't account for uploads
    # after the server is already started. AKA I'm lazy.
    scored_sounds = sorted(
      models.Sound.objects.all(),
      key=lambda sound: fuzz.ratio(data["text"], sound.name.lower()),
      reverse=True
    )
    app_config.sound_manager.play_sound(
      scored_sounds[0].sound_file.path,
      sound_name=scored_sounds[0].name,
      mic=True,
      headphone=True
    )
  elif data["event_type"] == "tts":
    # Declare X, Vocalize X, Voice X...
    app_config.voice_manager.tts(data["text"])

  return JsonResponse({"status": "hi"})

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

@api_view(["GET"])
@permission_classes([AllowAny])
def toggle_spotify_polling(request):
  """Updates the polling value in both the service & key value store."""
  app_config = apps.get_app_config("api")
  spotify_service = app_config.spotify_service
  set_value(SPOTIFY_SHOULD_POLL, not spotify_service.should_poll)
  spotify_service.should_poll = not spotify_service.should_poll
  return JsonResponse({"status": "cool"})

@api_view(["GET"])
@permission_classes([AllowAny])
def spotify_authorization(request):
  """Get spotify authorization code and put it in the db."""
  set_value(SPOTIFY_AUTHORIZATION_CODE, request.GET.get("code"))
  return HttpResponse("Got it boss")

@api_view(["GET"])
@permission_classes([AllowAny])
def twitch_authorization(request):
  """Gets twitch authorization code and puts it in the db."""
  logger.info(request.GET.get("code"))
  set_value(TWITCH_AUTHORIZATION_CODE, request.GET.get("code"))
  return HttpResponse("Got it boss")

@api_view(["POST"])
@permission_classes([AllowAny])
def create_and_start_poll(request):
  """Creates a poll and starts a thread to track progress."""
  app_config = apps.get_app_config("api")
  if get_value("poll_is_running"):
    return JsonResponse({"status": "already running"})

  poll = models.Poll(
    title=request.data["title"],
    timer=int(request.data["timer"])
  )
  poll.save()

  # Create a new questions object for each passed in question.
  for i, question in enumerate(request.data["questions"]):
    question = models.Question(
      poll=poll,
      text=question,
      ordinal=i+1
    )
    question.save()

  app_config.poll_manager.start_poll(poll)

  return JsonResponse({"status": "cool"})

@api_view(["POST"])
@permission_classes([AllowAny])
def stop_poll(request):
  """Finalizes the currently running poll and stops it."""
  app_config = apps.get_app_config("api")
  app_config.poll_manager.stop_poll()
  return JsonResponse({"status": "cool"})

@api_view(["POST"])
@permission_classes([AllowAny])
def vote(request):
  """Vote for an option in a currently running poll.

  Should create a vote if it doesn't exist, and update
  it if it already exists.
  """
  app_config = apps.get_app_config("api")
  if not get_value("poll_is_running"):
    return JsonResponse({"status": "Poll ain't runnin."})

  if not request.data["username"] or not request.data["choice"]:
    return JsonResponse({"status": "Bad request son."})

  try:
    vote = models.Vote.objects.get(
      poll=app_config.poll_manager.poll,
      username=request.data["username"]
    )
  except:
    vote = models.Vote(
      poll=app_config.poll_manager.poll,
      username=request.data["username"]
    )

  try:
    question = models.Question.objects.get(
      poll=app_config.poll_manager.poll,
      ordinal=int(request.data["choice"])
    )
    vote.question = question
    vote.save()
  except Exception as e:
    logger.info(e)
    return JsonResponse({"status": "Invalid Choice"})
  return JsonResponse({"status": "cool"})
