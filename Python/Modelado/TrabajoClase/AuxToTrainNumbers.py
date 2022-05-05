#%%
import h5py
import numpy
from Red_Neuronal import *
import matplotlib.pyplot as pl

#data=h5py.File("../Files/digitos.h5",'r')
data=h5py.File("../Files/digitos.h5",'r')
X=data["X"][:]
print(X.shape)
"""
y=data["y"][:]
r=RedNeuronal()
r.lambda_=1
r.capa1=400
r.capa2=30
r.capa3=10
r.inicializar()
r.fit(X,y)
r.entrenar()
#r.GuardarParams("Python\Modelado\Files\miguardada.h5")
r.GuardarParams("../Files/miguardada3.h5")
"""
#digito=X[834,:].reshape(1,-1)
#pl.imshow(digito.reshape(20,20).T)
#print(r.predecir(digito))

