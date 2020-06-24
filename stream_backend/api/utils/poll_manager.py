import asyncio
import json
import time

from asgiref.sync import sync_to_async

from api.utils.stoppable_thread import StoppableThread
from api.utils.websocket_client import WebSocketClient

class PollManager:
  thread = None
  poll = None
  current_timer = -1

  # Used to talk to the polling plugin display.
  websocket_client = None

  def __init__(self):
    self.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(self.loop)

  def aggregate_and_send(self):
    from api import models
    question_set = models.Question.objects.filter(poll=self.poll)
    vote_set = models.Vote.objects.filter(poll=self.poll)
    votes = {}
    for question in question_set:
      votes[question.ordinal] = 0
    for vote in vote_set:
      votes[vote.question.ordinal] += 1

    self.loop.run_until_complete(self.websocket_client.send({
      "type": "update",
      "timer": self.current_timer,
      "votes": votes
    }))

  def poll_poll(self):
    """Aggregates the vote data and updates the frontend every second."""
    from api import models
    from api.utils.key_value_utils import set_value

    questions = models.Question.objects.filter(poll=self.poll).order_by("ordinal")
    self.loop.run_until_complete(self.websocket_client.send({
      "type": "setup",
      "title": self.poll.title,
      "questions": [q.text for q in questions],
      "timer": self.current_timer
    }))

    while not self.thread.stopped() and self.current_timer > 0:
      self.aggregate_and_send()
      self.current_timer -= 1
      set_value("poll_timer", self.current_timer)
      time.sleep(1)

    set_value("poll_is_running", False)
    time.sleep(2)

    self.aggregate_and_send()
    self.loop.run_until_complete(self.websocket_client.send({
      "type": "finalize"
    }))

    return

  def start_poll(self, poll, set_timer=True):
    from api.utils.key_value_utils import get_value, set_value

    sync_to_async(set_value("poll_id", poll.id))
    sync_to_async(set_value("poll_is_running", True))
    if set_timer:
      sync_to_async(set_value("poll_timer", poll.timer))
    self.websocket_client = WebSocketClient(7005)
    self.loop.run_until_complete(self.websocket_client.connect())
    self.poll = poll
    self.current_timer = get_value("poll_timer")
    self.thread = StoppableThread(target=self.poll_poll)
    self.thread.start()
    return


  def stop_poll(self):
    from api.utils.key_value_utils import get_value
    is_running = get_value("poll_is_running")
    if not is_running:
      return

    self.thread.stop()
