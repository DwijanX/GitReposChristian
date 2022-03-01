#%%
from Libs.EulerHeuz import heuz,euler,RungeKuta,Convection
import numpy
import matplotlib.pyplot as pl


# ci =>[theta,velocidad]
def pendulo(t,ci,g):
    dvdt=-g*numpy.sin(ci[0])
    dTdt=ci[1]
    return numpy.array([dTdt,dvdt])

ci=numpy.array([numpy.pi/4,0.5])
Y,tiempos=heuz(0,50,ci,0.01,pendulo,9.81)


pl.plot(tiempos,Y[:,0],label="angulos")
pl.grid()