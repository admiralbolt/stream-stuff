import sys
import os
import time

import cv2

sys.path.append(os.path.realpath(os.path.join(
  os.getcwd(),
  "..",
  "stream_backend/api/utils"
)))

print(sys.path)

import image_helpers

latest_frame = image_helpers.get_latest_frame()
blurred_frame = image_helpers.blur(latest_frame, kernel_size=21)
sharpened_frame = cv2.addWeighted(latest_frame, 1.5, blurred_frame, -0.5, 0)

filter = cv2.imread("speed_lines.jpg")
grayscale = cv2.cvtColor(filter, cv2.COLOR_BGR2GRAY)
ret, thresh = cv2.threshold(grayscale, 127, 255, cv2.THRESH_BINARY_INV)
thresh_color = cv2.cvtColor(thresh, cv2.COLOR_GRAY2BGR)
cv2.imwrite("speed_lines_filter.jpg", thresh_color)

hsv = cv2.cvtColor(sharpened_frame, cv2.COLOR_BGR2HSV)
mixed = cv2.addWeighted(hsv, 0.8, thresh_color, 0.2, 0)

# final = cv2.cvtColor(mixed, cv2.COLOR_HSV2BGR)
final = cv2.addWeighted(sharpened_frame, 0.9, thresh_color, 0.1, 0)

cv2.imshow("Output", final)
cv2.waitKey()
