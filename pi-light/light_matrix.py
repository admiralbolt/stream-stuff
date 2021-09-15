import cv2
import imageio
import mimetypes
import os
import requests

from rgbmatrix import RGBMatrix, RGBMatrixOptions

class LightMatrix:

  def __init__(self):
    options = RGBMatrixOptions()
    options.rows = 64
    options.cols = 64
    # Need to set this for pi4 since it's so powerful.
    options.gpio_slowdown = 4
    options.hardware_mapping = "adafruit-hat-pwm"
    self.matrix = RGBMatrix(options = options)

  def DrawMatrix(self, image):
    """Draws a matrix of points to the led matrix.

    Expected input is a numpy array with 5 dimensions:
    x, y, b, g, r
    """
    for row in range(min(image.shape[1], 64)):
      for col in range(min(image.shape[0], 64)):
        self.matrix.SetPixel(col, row, image[row][col][2], image[row][col][1], image[row][col][0])
        

  def DrawImage(self, path):
    """Takes a path to an image and draws it to the led matrix.

    Converts the image to the 64x64 size, things may get squishy.
    """
    im = cv2.imread(path)
    im = cv2.resize(im, (64, 64))
    self.DrawMatrix(im)
    return

  def GetGifFrames(self, path):
    """Takes a path to a gif and draws it to the led matrix."""
    gif = imageio.mimread(path)
    return [cv2.resize(cv2.cvtColor(image, cv2.COLOR_RGB2BGR), (64, 64)) for image in gif]
