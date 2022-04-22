#%%
import numpy


import matplotlib.pyplot as pl
import numpy
import h5py
import cv2


def sigmoide(z):
        g=1/(1+numpy.exp(-z))
        return g

def IdentifyNumber(number):
      a0=numpy.append(numpy.ones(1),number)
      a0=a0.reshape(-1,1)
      a1=sigmoide(t1.dot(a0))
      a1=numpy.append(numpy.ones((1,1)),a1,axis=0)
      a2=sigmoide(t2.dot(a1))
      return(numpy.argmax(a2)),a2 

param=h5py.File('../Files/theta_digitos.h5','r')
param.keys()


t1=param['Theta1'][:]

t2=param['Theta2'][:]

data=h5py.File("../Files/digitos.h5",'r')

#print(data.keys())
X=data["X"][:]
y=data["y"][:]

"""
print(IdentifyNumber(X[3456,:]))
"""

test=cv2.imread('../Files/test/testgrande.jpg')
test=test[:,:,0]

#pl.imshow(test)

#GrayImage=cv2.cvtColor(test,cv2.COLOR_BGR2GRAY)
#pl.imshow(GrayImage)

GaussianFilter=cv2.GaussianBlur(test,(5,5),0)
#pl.imshow(GaussianFilter)

ret,imagen_bn=cv2.threshold(GaussianFilter,90,255,cv2.THRESH_BINARY_INV)
#pl.imshow(imagen_bn)

grupos,_=cv2.findContours(imagen_bn.copy(),cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)

ventanas= [cv2.boundingRect(g) for g in grupos]
a=[]
for v in ventanas:
        #cv2.rectangle(imagen_bn,(v[0],v[1]),(v[0]+v[2],+v[1]+v[3]),(255,0,0),2)
        espacio=int(v[3]*1.6)
        p1=int((v[1]+v[3]//2))-espacio//2
        p2=int((v[0]+v[2]//2))-espacio//2

        digitos=imagen_bn[p1:p1+espacio,p2:p2+espacio]
        a.append(digitos)
        

for number in a:
        height,width=number.shape
        rescaled = cv2.resize(number, (0, 0), fx=20/width, fy=20/height)
        rescaled=rescaled.reshape(-1,1)
        identified,percentages=IdentifyNumber(rescaled)
        print(identified)
        #print(percentages)
pl.imshow(a[0])