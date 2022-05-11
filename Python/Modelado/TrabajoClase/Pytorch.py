from random import shuffle
from torch import *
from torchvision import transforms
from torch import nn,optim

from torch.utils.data import Dataset
import h5py
import numpy
import cv2


transform=transforms.Compose([transforms.ToTensor(),transforms.Normalize((0.5,),(0.5,))])

train_loader=torch.utils.data.dataLoader(H5DData(digitos.h5),transform,batch_size=64,shuffle=True)

test_loader=

transforms.Normalize()
data=h5py.File("../Files/gatillos_train.h5",'r')
X=data["train_set_x"][:]
y=data["train_set_y"][:]
n=198
#pl.imshow(X[n][:])
XProcessed=numpy.array([])
def processImg(Img):
    GrayImage=cv2.cvtColor(Img,cv2.COLOR_BGR2GRAY)
    #pl.imshow(GrayImage)
    GaussianFilter=cv2.GaussianBlur(GrayImage,(5,5),0)
    #pl.imshow(GaussianFilter)
    #print(GaussianFilter.shape)

    ret,imagen_bn=cv2.threshold(GaussianFilter,90,255,cv2.THRESH_BINARY_INV)
    return numpy.array(imagen_bn.reshape(1,-1))


XProcessed=numpy.vstack([processImg(x) for x in X])