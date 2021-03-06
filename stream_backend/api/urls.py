from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework import routers

from api import views


router = routers.DefaultRouter(trailing_slash=False)
router.register(r"customemotes", views.CustomEmoteViewSet)
router.register(r"keyvalues", views.KeyValueViewSet)
router.register(r"scripts", views.ScriptViewSet)
router.register(r"sounds", views.SoundViewSet)
router.register(r"twitch_clips", views.TwitchClipViewSet)

urlpatterns = [
  path("ifttt/", views.ifttt),
  path("get_sounds_by_page/", views.get_sounds_by_page),
  path("get_scripts_by_page/", views.get_scripts_by_page),
  path("sounds/upload/", views.upload_sound),
  path("play_sound/", views.play_sound),
  path("run_script/", views.run_script),
  path("spotify_authorization/", views.spotify_authorization),
  path("twitch_authorization/", views.twitch_authorization),
  path("toggle_spotify_polling/", views.toggle_spotify_polling),
  path("", include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
