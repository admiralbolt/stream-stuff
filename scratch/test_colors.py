import os
import sys

sys.path.append(os.path.realpath(os.path.join(
  os.getcwd(),
  "..",
  "stream_backend/api/hardware"
)))

from light_manager import LightManager

l = LightManager()

# l.set_color(6, 65535, 65535, 3500)
l.set_waveform(6500, 65535, 65535, 3500, period=500, cycles=10, duty_cycle=0, waveform=4)
