#%%
from modulefinder import IMPORT_NAME
from sqlite3 import DataError
from statistics import correlation
from tkinter import Variable
import numpy
import matplotlib.pyplot as pl
import pandas
from scipy import rand
import seaborn
from Libs.ClaseRegresion import Regression 

data=pandas.read_csv('../Files/inmueble_data.csv')
#data=pandas.read_csv('Python\Modelado\Files\inmueble_data.csv')
#print(data.head())
#print(data.describe())
#print(data.isnull().values.any())

correlacion=data.corr(method='pearson')['precio']

#print(correlacion[numpy.argsort(correlacion,axis=0)[::-1]])


variables=correlacion.sort_values(ascending=False).head(6)

#print(variables.keys())

X=data[variables.keys()]

#print(X)

"""pl.figure(figsize=(20,6))
seaborn.set_style('white')
seaborn.set_style('ticks')
seaborn.pairplot(X,kind='reg')"""

#capturar el 70% de la data para entrenar el modelo
indices=numpy.random.rand(len(X))<0.7
data_Entrenamiento=X[indices]
data_test=X[~indices]

"""print(data_Entrenamiento.shape)
print(data_test.shape)
print(data.shape)"""



x=data_Entrenamiento.to_numpy()
indep=numpy.array(x[:,1:3])
y=data_Entrenamiento["precio"].to_numpy()
r=Regression()
r.fit(indep,y)
r.normalizar()
historial=r.descenso_gradiente2(0.01,1000)
pl.plot(range(historial.size),historial)
print(r.get_parametros())

transpuesta=numpy.matrix.transpose(indep)
thetaForm=numpy.matmul(numpy.linalg.inv(numpy.matmul(transpuesta,indep)),numpy.matmul(transpuesta,y))
print(thetaForm)
#data.describe().head(6)
#variables=correlation.sort_values(ascending=False).head(6)
#print(data)
