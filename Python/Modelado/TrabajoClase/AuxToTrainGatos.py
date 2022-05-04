#%%
import h5py
import numpy
from Red_Neuronal import *
import matplotlib.pyplot as pl

#data=h5py.File("../Files/digitos.h5",'r')
data=h5py.File("../Files/gatillos_train.h5",'r')
print(data["train_set_y"].shape)
#X=data["X"][:]
#y=data["y"][:]
"""
r=RedNeuronal()
r.lambda_=1
r.capa1=400
r.capa2=25 
r.capa3=10
r.inicializar()
r.fit(X,y)
r.entrenar()
#r.GuardarParams("Python\Modelado\Files\miguardada.h5")
r.GuardarParams("../Files/miguardada2.h5")
"""
#digito=X[834,:].reshape(1,-1)
#pl.imshow(digito.reshape(20,20).T)
#print(r.predecir(digito))



#revisar LBP HISTOGRAMA DE BLOQUE 
#revisar HOG HAAR