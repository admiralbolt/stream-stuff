data = {
  "data": {
    "message": {
      "sub_message": {
        "message": "A Twitch baby is born! KappaHD and then KappaHD cool.",
        "emotes": [
          {
            "start": 23,
            "end": 7,
            "id": 2867
          },
          {
            "start": 40,
            "end": 7,
            "id": 2867
          }
        ]
      }
    }
  }
}

message = data["data"]["message"]["sub_message"]["message"]
# Emotes get returned in the format
# ID1:start-end,start-end/ID2:start-end...
replacements = sorted(data["data"]["message"]["sub_message"]["emotes"], key=lambda x: x["start"])
# Now we actually replace shit.
index_increment = 0
for replacement in replacements:
  img_tag = f"<img src='https://static-cdn.jtvnw.net/emoticons/v1/{replacement['id']}/1.0' />"
  message = message[:replacement["start"] + index_increment] + img_tag + message[replacement["start"] + replacement["end"] + index_increment:]
  index_increment += len(img_tag) - replacement["end"]

print(message)
