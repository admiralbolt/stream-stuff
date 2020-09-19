import sys
import os
import time

sys.path.append(os.path.realpath(os.path.join(
  os.getcwd(),
  "..",
  "stream_backend/api/obs"
)))

sys.path.append(os.path.realpath(os.path.join(
  os.getcwd(),
  "..",
  "stream_backend"
)))

from obs_client import OBSClient
from obswebsocket.requests import *

# Border around the outside
BORDER = 15
# Margin between side panel and main content
MARGIN = 15
PANEL_ITEM_MARGIN = 15
# Width of the side panel
PANEL_WIDTH = 300
MAX_WIDTH = 1920
MAX_HEIGHT = 1080
# The hawhidth of the frame.
FRAME_WIDTH = 4



SCENE = "The New New"
WEBCAM = "Shitty Webcam"
MUH_DESKTOP = "Muh Desktop"
SPOODERFY = "Spotify!"
TWITCH_CHAT = "Twitch Chat"
SUB_GOAL = "Sub Goal Plugin"
GC = "Gamecube Controller"
PS4 = "PS4 Controller"
KOTH_MESSAGE = "Koth Message"
NOH_BOARD = "NohBoard"
BACKGROUND_IMAGE = "Background Image Plugin"
ALERT_BOX = "Streamlabs Alerts"
HR_HEART = "Heart Rate Heart"
HR_NUMBER = "Heart Rate Number"

client = OBSClient()
time.sleep(1)

def position_element(client, name, reference_value, x_position=0, y_position=0, use_height=False, use_crop=False):
  element = client.call(GetSceneItemProperties(name, scene_name=SCENE))

  scale = reference_value / (element.getSourceheight() if use_height else element.getSourcewidth())
  if use_crop:
    props = client.call(GetSceneItemProperties(name, scene_name=SCENE))
    crop = props.getCrop()
    if use_height:
      actual = element.getSourceheight() - crop["top"] - crop["bottom"]
    else:
      actual = element.getSourcewidth() - crop["left"] - crop["right"]
    scale = reference_value / actual

  client.call(SetSceneItemProperties(
    name,
    scene_name=SCENE,
    scale={
      "x": scale,
      "y": scale
    },
    position={
      # Our, exposition? AHAHAHAHAHA
      "x": x_position,
      "y": y_position
    }
  ))

  return client.call(GetSceneItemProperties(name, scene_name=SCENE))


cam = position_element(client, WEBCAM, PANEL_WIDTH,
                 x_position=MAX_WIDTH - PANEL_WIDTH - BORDER,
                 y_position=BORDER)

background_image = position_element(client, BACKGROUND_IMAGE, PANEL_WIDTH,
                 x_position=MAX_WIDTH - PANEL_WIDTH - BORDER,
                 y_position=BORDER)

target_width = 1920 - 2 * BORDER - PANEL_WIDTH - MARGIN - 2 * FRAME_WIDTH
desktop = position_element(client, MUH_DESKTOP, target_width,
                 x_position=BORDER + FRAME_WIDTH,
                 y_position=BORDER + FRAME_WIDTH)

content_height = desktop.getSourceheight() * desktop.getScale()["y"] + 2 * FRAME_WIDTH
footer_height = 1080 - content_height - 2 * BORDER - MARGIN - 2 * FRAME_WIDTH


footer_y = BORDER + content_height + MARGIN + FRAME_WIDTH
spotify = position_element(client, SPOODERFY, footer_height, use_height=True,
                 x_position=BORDER + FRAME_WIDTH, y_position=footer_y)

koth = position_element(client, KOTH_MESSAGE, footer_height, use_height=True,
                 x_position=BORDER + 3 * FRAME_WIDTH + 26 + spotify.getSourcewidth() * spotify.getScale()["x"],
                 y_position=footer_y)

alerts = position_element(client, ALERT_BOX, footer_height + 2 * FRAME_WIDTH, use_height=True,
                x_position=BORDER + 5 * FRAME_WIDTH + 26 + spotify.getSourcewidth() * spotify.getScale()["x"] + koth.getSourcewidth() * koth.getScale()["x"],
                y_position=footer_y - FRAME_WIDTH)

chat = position_element(client, TWITCH_CHAT, PANEL_WIDTH,
                 x_position=MAX_WIDTH - PANEL_WIDTH - BORDER,
                 y_position=400)

chat_height = chat.getScale()["y"] * chat.getSourceheight()

position_element(client, TWITCH_CHAT, PANEL_WIDTH,
                 x_position=MAX_WIDTH - PANEL_WIDTH - BORDER,
                 y_position=MAX_HEIGHT - BORDER - chat_height)


sub_goal = position_element(client, SUB_GOAL, PANEL_WIDTH - 2 * FRAME_WIDTH,
                 x_position=MAX_WIDTH - PANEL_WIDTH - BORDER + FRAME_WIDTH,
                 y_position=BORDER + cam.getSourceheight() * cam.getScale()["y"] + PANEL_ITEM_MARGIN + FRAME_WIDTH)

HR_HEIGHT = 100
hr_heart = client.call(GetSceneItemProperties(HR_HEART, scene_name=SCENE))
hr_heart = position_element(client, HR_HEART, HR_HEIGHT, use_height=True, use_crop=True,
                x_position=MAX_WIDTH - PANEL_WIDTH - BORDER + FRAME_WIDTH + 30,
                y_position=BORDER + cam.getSourceheight() * cam.getScale()["y"] + 2 * PANEL_ITEM_MARGIN + 2 * FRAME_WIDTH + sub_goal.getSourceheight() * sub_goal.getScale()["y"] + 2)

hr_number = client.call(GetSceneItemProperties(HR_NUMBER, scene_name=SCENE))
hr_number = position_element(client, HR_NUMBER, HR_HEIGHT, use_height=True, use_crop=True,
                x_position=MAX_WIDTH - PANEL_WIDTH - BORDER + FRAME_WIDTH + 130,
                y_position=BORDER + cam.getSourceheight() * cam.getScale()["y"] + 2 * PANEL_ITEM_MARGIN + 2 * FRAME_WIDTH + sub_goal.getSourceheight() * sub_goal.getScale()["y"])

noh = position_element(client, NOH_BOARD, PANEL_WIDTH,
                 x_position=MAX_WIDTH - PANEL_WIDTH - BORDER,
                 y_position=MAX_HEIGHT - chat_height - BORDER - PANEL_ITEM_MARGIN)

position_element(client, NOH_BOARD, PANEL_WIDTH,
                 x_position=MAX_WIDTH - PANEL_WIDTH - BORDER,
                 y_position=MAX_HEIGHT - chat_height - BORDER - PANEL_ITEM_MARGIN - noh.getSourceheight() * noh.getScale()["y"])


# gc = position_element(client, GC, PANEL_WIDTH,
#                  x_position=MAX_WIDTH - PANEL_WIDTH - BORDER,
#                  y_position=MAX_HEIGHT - chat_height - BORDER - PANEL_ITEM_MARGIN)
#
# position_element(client, GC, PANEL_WIDTH,
#                  x_position=MAX_WIDTH - PANEL_WIDTH - BORDER,
#                  y_position=MAX_HEIGHT - chat_height - BORDER - PANEL_ITEM_MARGIN - gc.getSourceheight() * gc.getScale()["y"])

ps4 = position_element(client, PS4, PANEL_WIDTH,
                 x_position=MAX_WIDTH - PANEL_WIDTH - BORDER,
                 y_position=MAX_HEIGHT - chat_height - BORDER - PANEL_ITEM_MARGIN,
                 use_crop=True)

position_element(client, PS4, PANEL_WIDTH,
                 x_position=MAX_WIDTH - PANEL_WIDTH - BORDER,
                 y_position=MAX_HEIGHT - chat_height - BORDER - PANEL_ITEM_MARGIN - ps4.getScale()["y"] * (ps4.getSourceheight() - ps4.getCrop()["top"] - ps4.getCrop()["bottom"]),
                 use_crop=True)

# Click that mo-fuckin transition button.
client.transition()
