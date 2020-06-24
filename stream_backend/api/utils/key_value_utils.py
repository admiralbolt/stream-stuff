import json

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

def set_value(key, value):
  """Tries to set a value for the given key.

  Updates it if it already exists, creates it if it doesn't.
  """
  try:
    kv = KeyValue.objects.get(key=key)
    kv.value = json.dumps(value)
  except:
    kv = KeyValue(key=key, value=value)
  kv.save()
  return
