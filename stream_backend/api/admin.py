from django.contrib import admin
from api.models import ADMIN_MODELS

for model in ADMIN_MODELS:
  admin.site.register(model)
