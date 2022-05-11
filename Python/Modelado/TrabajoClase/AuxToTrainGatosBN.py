#%%
import h5py
import numpy
from Red_Neuronal  import *
import matplotlib.pyplot as pl
import cv2

data=h5py.File("Python\Modelado\Files\gatillos_train.h5",'r')
#data=h5py.File("../Files/gatillos_train.h5",'r')
X=data["train_set_x"][:]
y=data["train_set_y"][:]
n=198
#pl.imshow(X[n][:])
XProcessed=numpy.array([])
def processImg(Img):
    GrayImage=cv2.cvtColor(Img,cv2.COLOR_BGR2GRAY)
    #pl.imshow(GrayImage)
    #GaussianFilter=cv2.GaussianBlur(GrayImage,(5,5),0)
    #pl.imshow(GaussianFilter)
    #print(GaussianFilter.shape)

    #ret,imagen_bn=cv2.threshold(GaussianFilter,90,255,cv2.THRESH_BINARY_INV)
    return GrayImage.reshape(1,-1)


XProcessed=numpy.vstack(numpy.array([processImg(x) for x in X]))

#print(XProcessed.shape)

r=RedNeuronal()
r.lambda_=1
r.capa1=64*64
r.capa2=110
r.capa3=2
r.inicializar()
r.fit(XProcessed,y)
r.entrenar()
r.setProcessImg(processImg)
#Suc,Err=r.ProbarLambda("../Files/gatillos_test.h5","test_set_x","test_set_y")
Suc,Err=r.ProbarLambda("Python\Modelado\Files\gatillos_test.h5","test_set_x","test_set_y")
print("suc",Suc)
print("Err",Err)
#r.GuardarParams("Python\Modelado\Files\miguardada.h5")
#r.GuardarParams("../Files/trainGatosParams.h5")

#digito=X[834,:].reshape(1,-1)
#pl.imshow(digito.reshape(20,20).T)
#print(r.predecir(digito))



#revisar LBP HISTOGRAMA DE BLOQUE 
#revisar HOG HAAR