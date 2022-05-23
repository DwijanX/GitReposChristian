import cv2
import numpy as np

imagen = cv2.imread("manos.jpg")
a = np.double(imagen)
gris = (a[:,:,0] + a[:,:,1] +a[:,:,2])

a[:,:,0] = a[:,:,0] / gris
a[:,:,1] = a[:,:,1] / gris
a[:,:,2] = a[:,:,2] / gris

print(a)
img2 = np.uint8(a)

cv2.imshow("frame2",img2)
cv2.waitKey(0)
cv2.destroyAllWindows()

