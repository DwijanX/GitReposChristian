#%%
import numpy
import matplotlib.pyplot as pl
import h5py
# importamos la libreria sklear, implementacion del algoritmo de Support Vector machine
from sklearn.svm import SVC

# vamos a cargar la data03.h5, data que contenia tamanios e intensidades de grises 
# de manchas en una radigrafia, y  teniamos el dato si pertenecian a tumores 
# benignos a malignos.
data = h5py.File("../Files/data04.h5", "r")

# verificamos sus llaves
data.keys()

# variable caracteristica
X = data["X"][:]
# variable caracteristica
y = data["y"][:]

# capturamos los indices que son positivos (y=1), y negativos (y=0)
indices_positivos = numpy.where(y==1)
indices_negativos = numpy.where(y==0)

# graficamos el conjunto entrenamiento
pl.scatter(X[indices_positivos, 0], X[indices_positivos, 1], color='red')
pl.scatter(X[indices_negativos, 0], X[indices_negativos, 1], color='blue')
pl.grid()

# entrenamiento mediante la implementacion svm de sklearn.
# tenemos un kerne lineal.... recuerdas que es un kernel linea?? puedes decribirlo???
#el kernel lineal nos devolvera un ajuste lineal a los datos

clasificador = SVC(kernel="linear")
clasificador.fit(X, y)

# capturamos los parametros
theta0 = clasificador.intercept_
theta1 = clasificador.coef_[0, 0]
theta2 = clasificador.coef_[0, 1]

# graficamos
pl.scatter(X[indices_positivos, 0], X[indices_positivos, 1], color='red')
pl.scatter(X[indices_negativos, 0], X[indices_negativos, 1], color='blue')
pl.plot([0, -theta0 / theta1], [-theta0/theta2, 0])




# cuall sería el resultado par esta data??
data = numpy.loadtxt("../Files/datos04.txt", delimiter=',')
X = data[:,0:-1]
y = data[:, -1]

indices_positivos = numpy.where(y==1)
indices_negativos = numpy.where(y==0)
# graficamos
pl.scatter(X[indices_positivos, 0], X[indices_positivos, 1], color='red')
pl.scatter(X[indices_negativos, 0], X[indices_negativos, 1], color='blue')

