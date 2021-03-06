import cv2
import logging
import os
import glob
import numpy as np

from datetime import datetime

logger = logging.getLogger(__name__)

DEFAULT_FOLDER = "C:\\Users\\avikn\\Videos\\"

def get_latest_recording(folder=DEFAULT_FOLDER):
  if not os.path.isdir(folder):
    logger.info("Not a folder yo.")
    return

  mkv_files = glob.glob(os.path.join(folder, "*.mkv"))
  date_mkv = [
    datetime.strptime(os.path.basename(f.split(".")[0]), "%Y-%m-%d %H-%M-%S")
    for f in mkv_files
  ]
  latest_file_name = mkv_files[date_mkv.index(max(date_mkv))]
  return os.path.join(folder, latest_file_name)

def get_latest_frame(folder=DEFAULT_FOLDER):
  if not os.path.isdir(folder):
    logger.info("Still not a folder dawg.")
    return

  latest_recording = get_latest_recording(folder=folder)
  cap = cv2.VideoCapture(latest_recording)
  ret, frame = cap.read()
  return frame

def blur(img, kernel_size=11, std_dev_x=0, std_dev_y=0):
  return cv2.GaussianBlur(img, (kernel_size, kernel_size), std_dev_x, std_dev_y)

def sepia_filter(img):
  b, g, r = cv2.split(img)
  new_b = b * 0.222 + g * 0.534 + r * 0.181
  new_g = b * 0.299 + g * 0.686 + r * 0.218
  new_r = b * 0.343 + g * 0.769 + r * 0.239
  new_im = cv2.merge((new_b, new_g, new_r))
  new_im[np.where(new_im > 255)] = 255
  return np.array(new_im, dtype=np.uint8)
