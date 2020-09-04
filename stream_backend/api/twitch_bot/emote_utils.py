def get_emote_url(emote_id, size=1.0):
  """Gets the url for an emote by id.

  Urls look like:
  https://static-cdn.jtvnw.net/emoticons/v1/{emote_id}/{size}

  Where size can by any of: 1.0, 2.0, 3.0, 4.0
  """
  return f"https://static-cdn.jtvnw.net/emoticons/v1/{emote_id}/{size}"

def emote_generator(emotes):
  """Iterate through all emotes in a message."""
  for emote_string in emotes.split("/"):
    emote_id, positions = emote_string.split(":")
    for pos in positions.split(","):
      start, end = tuple(map(int, pos.split("-")))
      yield (emote_id, start, end)

def replace_emotes_in_message(message, emotes, size=1.0):
  """Replaces emotes within a message with their proper img tags.

  This requires some garbage math.
  """
  replacements = []
  for emote_id, start, end in emote_generator(emotes):
    replacements.append({"emote_id": emote_id, "start": start, "end": end})
  # We need to process in order of index
  replacements = sorted(replacements, key=lambda x: x["start"])
  # Now we actually replace shit.
  index_increment = 0
  for replacement in replacements:
    img_tag = f"<img src='{get_emote_url(replacement['emote_id'], size)}' />"
    message = message[:replacement["start"] + index_increment] + img_tag + message[replacement["end"] + index_increment + 1:]
    index_increment += len(img_tag) - (replacement["end"] - replacement["start"]) - 1
  return message
