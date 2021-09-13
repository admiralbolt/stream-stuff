import cv2
import time

from light_matrix import LightMatrix

matrix = LightMatrix()
matrix.DrawImageFromUrl("https://i.imgflip.com/5mrh9m.jpg")
# matrix.DrawImageFromUrl("https://i.imgflip.com/5mrh5i.jpg")
# matrix.DrawImageFromUrl("https://static2.srcdn.com/wordpress/wp-content/uploads/2020/12/Breaking-Bad-Walter-White-memes.jpg")

time.sleep(15)
