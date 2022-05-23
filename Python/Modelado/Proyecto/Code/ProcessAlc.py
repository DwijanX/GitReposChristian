#%%
import cv2
from cv2 import INTER_AREA
import torch
import matplotlib.pyplot as pl
import os
import numpy
from PIL import Image
import h5py
# assign directory
directory = '../Images/Alcohol/'
Images=[]
count=0
def resizeImg(Img):
    return cv2.resize(Img,(128,128),interpolation=INTER_AREA)

for filename in os.listdir(directory):
    f = os.path.join(directory, filename)
    if os.path.isfile(f):
        
        img = Image.open(f)
        img = img.resize((128, 128), Image.ANTIALIAS)
        open_cv_image = numpy.array(img) 
        count+=1
        #Img=cv2.imread(f)
        Images.append(open_cv_image)


#print(Images[0])
pl.imshow(Images[18])
y=numpy.ones(count)
y=2*y

t=h5py.File('../Images/DatasetAlcohol.h5','w')
t.create_dataset('Y_TrainSet',data=y)
t.create_dataset('X_TrainSet',data=Images)
t.close()
"""
Images=numpy.array(Images)


ImagesResized=[]
for img in Images:
    aux=resizeImg(img)
    ImagesResized.append(aux)
"""



""" 
imagen=cv2.imread("../Images/Alcohol/8c43d837650c46528921251de55e24f4.jpg")

"""  

