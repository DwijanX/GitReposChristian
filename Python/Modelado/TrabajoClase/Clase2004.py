

import numpy
import matplotlib.pyplot as pl
import cv2
import h5py


def getSignoide(z):
        g=1/(1+numpy.exp(-z))
        return g

param=h5py.File('theta_digitos.h5','r')
param.keys()



X=param["X"][:]
y=param["y"][:]



t1=param['Theta1'][:]
t1.shape


t2=param['Theta2'][:]
t2.shape


a0=numpy.append(numpy.ones(1),X[4456,:])

a1=getSignoide(t1.dot(a0))
a1=numpy.append(numpy.ones((1,1)),a1,axis=0)

a2=getSignoide(t2.dot(a1))
