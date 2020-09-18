import requests

from api._secrets import UNSPLASH_ACCESS_KEY

API_BASE = "https://api.unsplash.com"

def get_random_photo_url(keywords=None):
  """
  Gets a random photo url from unsplash.com. If keywords is specified filter
  results based on matches to the keywords.
  """
  url = f"{API_BASE}/photos/random?orientation=landscape"
  if keywords:
    url += f"&query={keywords}"
  r = requests.get(url,
    headers={
      "Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"
    }
  )

  data = r.json()
  if "errors" in data:
    return ""

  return data["urls"]["small"]
