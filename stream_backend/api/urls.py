from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework import routers

from api import views


router = routers.DefaultRouter(trailing_slash=False)
router.register(r"scripts", views.ScriptViewSet)
router.register(r"sounds", views.SoundViewSet)

urlpatterns = [
  path("sounds/upload/", views.upload_sound),
  path("play_sound/", views.play_sound),
  path("run_script/", views.run_script),
  path("", include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
