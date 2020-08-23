import json

from asgiref.sync import sync_to_async

from api.models import KeyValue

def get_value(key):
  """Tries to get a value for the given key.

  Returns None if a data value isn't found.
  """
  try:
    kv = KeyValue.objects.get(key=key)
    return json.loads(kv.value)
  except:
    return None

@sync_to_async
def async_get_value(key):
  return get_value(key)

def set_value(key, value):
  """Tries to set a value for the given key.

  Updates it if it already exists, creates it if it doesn't.
  """
  try:
    kv = KeyValue.objects.get(key=key)
    kv.value = json.dumps(value)
  except:
    kv = KeyValue(key=key, value=json.dumps(value))
  kv.save()
  return

@sync_to_async
def async_set_value(key, value):
  return set_value(key, value)
