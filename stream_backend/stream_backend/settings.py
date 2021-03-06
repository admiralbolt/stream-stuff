"""
Django settings for stream_backend project.

Generated by "django-admin startproject" using Django 3.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "+22jy14%8j7bgjv3ph+!2l6rl)b%#1wg4l$lu3ly%4jsa(opf)"

# SECURITY WARNING: don"t run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

MEDIA_ROOT = "C:\\Users\\avikn\\git\\stream-stuff\\stream_backend\\uploads"
MEDIA_URL = "/uploads/"

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
STATIC_ROOT = "C:\\Users\\avikn\\git\\stream-stuff\\stream_backend\\static"
STATIC_URL = "/static/"


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "garbage",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "django_extensions",
    "api",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

REST_FRAMEWORK = {
  "EXCEPTION_HANDLER": "rest_framework_json_api.exceptions.exception_handler",
  "DEFAULT_PERMISSION_CLASSES": [
    "rest_framework.permissions.AllowAny"
  ],
  "DEFAULT_PARSER_CLASSES": (
    "rest_framework_json_api.parsers.JSONParser",
    "rest_framework.parsers.FormParser",
    "rest_framework.parsers.MultiPartParser"
  ),
  "DEFAULT_RENDERER_CLASSES": (
    "rest_framework_json_api.renderers.JSONRenderer",
    "rest_framework.renderers.BrowsableAPIRenderer",
  ),
  "DEFAULT_FILTER_BACKENDS": (
    "rest_framework.filters.OrderingFilter",
  ),
  "DEFAULT_METADATA_CLASS": "rest_framework_json_api.metadata.JSONAPIMetadata",
  "DEFAULT_AUTHENTICATION_CLASSES": (
    "rest_framework.authentication.TokenAuthentication",
    "rest_framework.authentication.SessionAuthentication",
  ),
  "DEFAULT_FILTER_BACKENDS": (
    "rest_framework.filters.OrderingFilter",
  ),
}

CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOW_HEADERS = [
  "content-disposition",
  "content-type"
]

LOGGING = {
  "version": 1,
  "disable_existing_loggers": False,
  "formatters": {
    "timestamped": {
      "format": "{levelname} {asctime} {module} {message}",
      "style": "{"
    }
  },
  "handlers": {
    "file": {
      "level": "INFO",
      "class": "logging.FileHandler",
      "filename": "/Users/avikn/git/stream-stuff/stream_backend/info.log",
      "formatter": "timestamped"
    }
  },
  "root": {
    "handlers": ["file"],
    "level": "INFO",
    "propagate": True,
  }
}


ROOT_URLCONF = "stream_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "stream_backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "America/Chicago"

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = "/static/"
