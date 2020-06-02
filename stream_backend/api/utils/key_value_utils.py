from api.models import KeyValue

def get_value(key):
  """Tries to get a value for the given key.

  Returns None if a data value isn't found.
  """
  try:
    kv = KeyValue.objects.get(key=key)
    return kv.value
  except:
    return None
