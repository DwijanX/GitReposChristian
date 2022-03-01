#%%
from Libs.EulerHeuz import heuz,euler
import numpy
import matplotlib.pyplot as pl

def dep_pres(t, ci, a, b, c, d, N):
    dCdt = a * (1- ci[0]/N)*ci[0] - b * ci[0]*ci[1]
    dZdt = -c * ci[1] + d * ci[0]*ci[1]
    return numpy.array([dCdt,dZdt])


ci = numpy.array([1.,0.5])
a,b,c,d = 1.2, 1, 0.9, 1.5
N = 500

Y,tiempo=heuz(0, 30, ci, 0.1, dep_pres, a, b, c, d, N)

pl.plot(tiempo,Y[:,0],label="conejos")
pl.plot(tiempo,Y[:,1],label="zorros")
pl.legend()
pl.grid()




