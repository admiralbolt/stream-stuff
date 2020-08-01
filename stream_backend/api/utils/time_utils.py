
def human_readable(timedelta):
  """Takes a timedelta and makes it pretty."""
  total_seconds = timedelta.total_seconds()

  hours = int(total_seconds // 3600)
  total_seconds -= hours * 3600
  minutes = int(total_seconds // 60)
  total_seconds -= minutes * 60
  seconds = int(total_seconds)
  return f"{hours}h {minutes}m {seconds}s"
