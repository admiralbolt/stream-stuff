import asyncio
import queue
import random
import re

from asgiref.sync import sync_to_async
from django.template.loader import render_to_string
from profanityfilter import ProfanityFilter

from api.const import TWITCH_SUBSCRIBER_COUNT
from api.models import Sound
from api.utils.key_value_utils import async_get_value, async_set_value
from api.utils.stoppable_thread import StoppableThread

BITS_ALERT_LENGTH = 11
FOLLOW_ALERT_LENGTH = 5
SUB_ALERT_LENGTH = 12

CHEER_REGEX = re.compile(r"(anon|Cheer)[1-9]([0-9]?)+")

# Bit gif urls looks like this:
# https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/100/1.gif
# Where the number in the path is the amount of bits cheered, 1, 100, 1000, 5000, 10000.
# The gif name at the end is the size, can be any of 1, 1.5, 2, 3, 4.
BIT_GIF_BASE = "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/%s/%s.gif"
# Same as above but for anonymous donations.
ANON_BIT_GIF_BASE = "https://d3aqoihi2n8ty8.cloudfront.net/actions/anon/dark/animated/%s/%s.gif"

BIT_THRESHOLDS = [1, 100, 1000, 5000, 10000]
BIT_HIGHLIGHT_COLORS = [
  "#6e6e6f",
  "#8943e0",
  "#43cec3",
  "#2574d0",
  "#fe413c"
]

class AlertHandler:
  """Handles all twitch alerts!

  Twitch pubsub reference: https://dev.twitch.tv/docs/pubsub

  This works primarily with a mutex & queue so that alerts aren't processed
  simultaneously.
  """

  def __init__(self, websockets, sound_manager, script_manager):
    self.websockets = websockets
    self.sound_manager = sound_manager
    self.script_manager = script_manager
    self.queue = queue.Queue()
    self.filter = ProfanityFilter()
    self.start_worker()

  def start_worker(self):
    """Start the worker thread for processing the alerts queue."""
    self.worker_thread = StoppableThread(target=self.process_queue, daemon=True)
    self.worker_thread.start()

  def process_queue(self):
    """Process the alert queue, interesting logic is in async_process_queue."""
    self.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(self.loop)

    asyncio.run(self.async_process_queue())

  async def async_process_queue(self):
    """Processes message from our alert queue."""

    while not self.worker_thread.stopped():
      data = self.queue.get()
      await self.handle_alert(data)
      self.queue.task_done()
      await asyncio.sleep(1)

  async def handle_alert(self, data):
    """Handles an alert.

    Routes the message to the correct sub function:
      handle_bits, handle_follow, or handle_sub
    Delays based on the length of the alert.
    """
    print("handle_alert")
    print(data)
    await {
      "bits_event": self.handle_bits,
      "follow_event": self.handle_follow,
      "sub_event": self.handle_sub
    }[data["message_type"]](data)

    await asyncio.sleep({
      "bits_event": BITS_ALERT_LENGTH,
      "follow_event": FOLLOW_ALERT_LENGTH,
      "sub_event": SUB_ALERT_LENGTH
    }[data["message_type"]])

  def get_bits_gif_url(self, bits_used, size, anon=False):
    """Gets a gif url for a given bit value."""
    bit_threshold = 1
    for thresh in BIT_THRESHOLDS:
      if bits_used > thresh:
        bit_threshold = thresh
      else:
        break
    return (ANON_BIT_GIF_BASE if anon else BIT_GIF_BASE) % (bit_threshold, size)

  def get_bits_highlight_color(self, bits_used):
    bit_index = 0
    for index, thresh in enumerate(BIT_THRESHOLDS):
      if bits_used > thresh:
        bit_index = index
      else:
        break

    return BIT_HIGHLIGHT_COLORS[bit_index]

  async def handle_bits(self, data):
    """Generates an alert for bits.

    Bits data looks something like this:

    {
     'message_id': '06f40997-462e-5473-9c0c-38ada0a0f04e',
     'message_type': 'bits_event',
     'version': '1.0'
     'data':
     {
        'badge_entitlement': None,
        'bits_used': 1,
        'channel_id': '83968979',
        'channel_name': 'admirallightningbolt',
        'chat_message': 'Cheer1',
        'context': 'cheer',
        'is_anonymous': False,
        'time': '2020-08-03T18:38:56.652133092Z',
        'total_bits_used': 13,
        'user_id': '561395702',
        'user_name': 'lightningbolttest69'
      },
    }
    """
    await self.sound_manager.async_play_sound(sound_name="Boom", mic=True, headphone=True)
    chat_message = data["data"]["chat_message"]
    bits_used = data["data"]["bits_used"]
    is_anon = data["data"]["user_name"] is None
    new_words = []
    for word in self.filter.censor(chat_message).split():
      if not CHEER_REGEX.match(word):
        new_words.append(word)
        continue

      new_words.append(f"<img class='lil-bit' src='{self.get_bits_gif_url(bits_used, 1, anon=is_anon)}' />")
      new_words.append(f"<span style='color:{self.get_bits_highlight_color(bits_used)}'>{word[5:]}</span>")

    await self.websockets.canvas.send({
      "type": "create",
      "id": f"bits_{random.random()}",
      "html": render_to_string("bits_alert.html", {
        "name": data["data"]["user_name"] or "Anonymous",
        "message": " ".join(new_words),
        "bits_used": data["data"]["bits_used"],
        "big_gif": self.get_bits_gif_url(data["data"]["bits_used"], 4, anon=is_anon),
        "total_bits": data["data"]["total_bits_used"],
        "version": random.random()
      }),
      "timer": BITS_ALERT_LENGTH * 1000,
      "opacityDecay": "exponential"
    })

  async def handle_follow(self, data):
    """Generate an alert for a new follow!

    Follow event data looks like this:
    {
      'data': [
        {
          'followed_at': '2020-08-03T18:51:54Z',
          'from_id': '561395702',
          'from_name': 'lightningbolttest69',
          'to_id': '83968979',
          'to_name': 'admirallightningbolt'
        }
      ]
    }
    """
    await self.sound_manager.async_play_sound(sound_name="Falcon Yes", mic=True, headphone=True)
    await self.websockets.canvas.send({
      "type": "create",
      "id": f"follow_{random.random()}",
      "html": render_to_string("follower_alert.html", {
        "name": data["data"][0]["from_name"],
        "version": random.random()
      }),
      "timer": FOLLOW_ALERT_LENGTH * 1000,
      "opacityDecay": "exponential"
    })

  async def handle_sub(self, data):
    """Generates an alert for a subscription!

    Subscription event data is complex, here's an example:
    {
      "type": "MESSAGE",
      "data": {
        "topic": "channel-subscribe-events-v1.44322889",
        "message": {
          "user_name": "tww2",
          "display_name": "TWW2",
          "channel_name": "mr_woodchuck",
          "user_id": "13405587",
          "channel_id": "89614178",
          "time": "2015-12-19T16:39:57-08:00",
          "sub_plan": "1000",
          "sub_plan_name": "Channel Subscription (mr_woodchuck)",
          "cumulative_months": 9,
          "streak_months": 3,
          "context": "resub",
          "is_gift": false,
          "sub_message": {
            "message": "A Twitch baby is born! KappaHD",
            "emotes": [
              {
                "start": 23,
                "end": 7,
                "id": 2867
              }
            ]
          }
        }
      }
    }

    Important things to note:
    * context acts like a discriminator, can be (sub, resub, subgift,
      anonsubgift, resubgift, anonresubgift)
    * sub_plan can be Prime, 1000, 2000, 3000. Guessing that's for Tier1/2/3
    * is_gift flag marks if it's a gift, if so a whole bunch of recipient data
      is added.
    """
    print("handle_sub")
    print(data)
    current_sub_count = await async_get_value(TWITCH_SUBSCRIBER_COUNT)
    await async_set_value(TWITCH_SUBSCRIBER_COUNT, current_sub_count + 1)
    await self.websockets.sub_goal.send({
      "sub_count": current_sub_count + 1
    })
    self.script_manager.run_script("birthday_party")
    message = self.filter.censor(data["sub_message"]["message"])
    if data["sub_message"]["emotes"]:
      # Emotes get returned as a list of dictionaries, with three keys:
      # {"start": 23, "end": 7, "id": 2867}
      # End is actually the length of the emote itself, not its end index.
      # Before we do any processing, we need to sort our ranges based off their
      # order, that way we process replacements in order of occurence.
      replacements = sorted(data["sub_message"]["emotes"], key=lambda x: x["start"])
      # Now we actually replace shit.
      index_increment = 0
      for replacement in replacements:
        img_tag = f"<img width='14' height='14' src='https://static-cdn.jtvnw.net/emoticons/v1/{replacement['id']}/1.0' />"
        message = message[:replacement["start"] + index_increment] + img_tag + message[replacement["start"] + replacement["end"] + index_increment:]
        index_increment += len(img_tag) - replacement["end"]

    # Info string should be based on the type of sub.
    # Something like Subbed!, ReSubbed for x Months!, Gifted x Subs!
    info = ""
    context = data["context"]
    if context == "sub":
      info = "Subbed!"
    elif context == "resub":
      info = f"Resubbed for {data['cumulative_months']} months!"
    else:
      info = f"Gifted some subs!"

    await self.websockets.canvas.send({
      "type": "create",
      "id": f"sub_{random.random()}",
      "html": render_to_string("sub_alert.html", {
        "alert_gif_url": "https://i.giphy.com/media/6oMKugqovQnjW/giphy.webp",
        "name": data["user_name"] or "Anonymous",
        "info": info,
        "message": message,
        "version": random.random()
      }),
      "timer": SUB_ALERT_LENGTH * 1000,
      "opacityDecay": "exponential"
    })

  async def queue_alert(self, data):
    """Puts an alert into the queue for processing.

    Data can come from a pubsub connection OR a webhook.
    """
    self.queue.put_nowait(data)
    return

  async def queue_sub(self, data):
    """Puts a sub alert into the queue for processing."""
    data["message_type"] = "sub_event"
    await self.queue_alert(data)
