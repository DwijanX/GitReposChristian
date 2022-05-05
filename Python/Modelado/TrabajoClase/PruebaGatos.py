#%%
import numpy


import matplotlib.pyplot as pl
import numpy
import h5py
import cv2
from Red_Neuronal import *

r=RedNeuronal()
#r.cargar_parametros('../Files/theta_digitos.h5')
r.cargar_parametros('../Files/trainGatosParams.h5')

dataPrueba=h5py.File("../Files/gatillos_test.h5",'r')
nPrueba=20
X=dataPrueba["test_set_x"][:]
Y=dataPrueba["test_set_y"][:]
test=X[nPrueba][:]
print(test.shape)
#test=test[:,:,:]
def ProcessImg(Img):
        GrayImage=cv2.cvtColor(Img,cv2.COLOR_BGR2GRAY)
        GaussianFilter=cv2.GaussianBlur(GrayImage,(5,5),0)

        ret,imagen_bn=cv2.threshold(GaussianFilter,90,255,cv2.THRESH_BINARY_INV)
        
        identified=r.predecir(imagen_bn.reshape(1,-1))
        
        return identified

for x in X:
        ans=ProcessImg(x)
        pl.imshow(x)
        print(ans)
"""
camara=cv2.VideoCapture(0)
while True:
    success,img=camara.read()
    img=ProcessImg(img)
    cv2.imshow('Video',img)
    if cv2.waitKey(1) & 0xFF==ord('q'):
        break
"""
#correctas [1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1]

