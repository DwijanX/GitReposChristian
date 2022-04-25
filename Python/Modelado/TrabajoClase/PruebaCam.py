#%%
import cv2
cam=cv2.VideoCapture(0)
#cam.set(3,640)
#cam.set(3,640)


while True:
    success,img=cam.read()
    cv2.imshow('Video',img)
    if cv2.waitKey(1) & 0xFF==ord('q'):
        break