import cv2
import numpy as np
import time

cap = cv2.VideoCapture(cv2.CAP_DSHOW)
time.sleep(2)

print(cap.isOpened())

ret, frame = cap.read()
print(ret)
print(frame)

gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

cv2.imshow('vid', gray)
cv2.waitKey(0)
cv2.destroyAllWindows()
