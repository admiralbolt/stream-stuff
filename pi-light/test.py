import cv2
import time

from light_matrix import LightMatrix

matrix = LightMatrix()
frames = matrix.DrawImageFromUrl("https://cdn.betterttv.net/emote/6085387f39b5010444d05e0d/3x")

while True:
  for frame in frames:
    matrix.DrawMatrix(frame)
    time.sleep(0.1)

