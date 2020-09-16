import lifxlan

from fuzzywuzzy import fuzz

# A list of all colors useable by twitch chat. These are stored in:
# [Hue, Saturation, Brightness, Kelvin] format.
# Also see: https://api.developer.lifx.com/docs/colors
COLORS = {
  "aqua": [24000, 65535, 65535, 3500],
  "blue": [43634, 65535, 65535, 3500],
  "cyan": [29814, 65535, 65535, 3500],
  "gold": [58275, 0, 65535, 2500],
  "green": [16173, 65535, 65535, 3500],
  "light_blue": [36000, 65535, 65535, 3500],
  "lime": [12500, 65535, 65535, 3500],
  "pink": [58275, 65535, 47142, 3500],
  "purple": [50486, 65535, 65535, 3500],
  "red": [65535, 65535, 65535, 3500],
  "orange": [6500, 65535, 65535, 3500],
  "white": [58275, 0, 65535, 5500],
  "yellow": [9000, 65535, 65535, 3500]
}

COLOR_NAMES = sorted(list(COLORS.keys()))

class LightManager:
  """Is repsonsible for integrating with and changing the LIFX lightbulbs.

  On startup, we search the network for all lightbulbs, and we keep track of
  the ones that are marked with the 'Twitch' group.
  """

  def __init__(self):
    self.lan = lifxlan.LifxLAN()
    self.lights = []
    for light in self.lan.get_lights():
      if light.get_group() == "Twitch":
        self.lights.append(light)
    return

  def set_color_fuzzy(self, user_input):
    """Sets the color of all light bulbs to the *closest* matching color.

    This matches the name of the passed in color to the names of all available
    colors and sets it to the closest one.
    """
    color_name = sorted(
      COLOR_NAMES,
      key=lambda name: fuzz.ratio(user_input.lower(), name),
      reverse=True
    )[0]
    color = COLORS[color_name]
    self.set_color(color[0], color[1], color[2], color[3])
    return

  def set_color(self, hue, saturation, brightness, kelvin, duration=1500):
    """Sets the color of all light bulbs based on absolute parameters.

    HSBK is a weird version of HSV color space. I still don't really get it.
    Ranges of values:
      hue: [0, 65535]
      saturation: [0, 65535]
      brightness: [0, 65535]
      kelvin: [2500, 9000]
    """
    for light in self.lights:
      light.set_color([hue, saturation, brightness, kelvin], duration)
    return

  def set_waveform_fuzzy(self, user_input):
    """Sets the color of all light bulbs to the *closest* matching color.

    This matches the name of the passed in color to the names of all available
    colors and sets it to the closest one.
    """
    color_name = sorted(
      COLOR_NAMES,
      key=lambda name: fuzz.ratio(user_input.lower(), name),
      reverse=True
    )[0]
    color = COLORS[color_name]
    self.set_waveform(color[0], color[1], color[2], color[3])
    return

  def set_waveform(self, hue, saturation, brightness, kelvin, period=3000, cycles=5, duty_cycle=0, waveform=1):
    """Sets the waveform of all light bulbs based on absolute paramaters."""
    for light in self.lights:
      light.set_waveform(1, [hue, saturation, brightness, kelvin], period, cycles, duty_cycle, waveform, rapid=True)
    return
