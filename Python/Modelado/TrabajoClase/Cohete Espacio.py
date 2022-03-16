#%%
from cmath import sqrt

from Libs.EulerHeuz import heuz,euler,RungeKuta
import numpy
import matplotlib.pyplot as pl



#ci=>[Posicion,Velocidad]
def getDirCohete(t,ci,G,mt,ml,PosLuna):
    NaveTierra=-ci[0]
    NaveLuna=PosLuna-ci[0]
    DistanciaNaveTierra=numpy.linalg.norm(NaveTierra)
    DistanciaNaveLuna=numpy.linalg.norm(NaveLuna)
    a=(G*mt/DistanciaNaveTierra**3)*NaveTierra
    b=-G*ml*NaveLuna/DistanciaNaveLuna**3
    dvdt=a+b
    dxdt=ci[1]
    return numpy.array([dxdt,dvdt])

G=6.67e-11   # N*M^2/kg^2
MasaTierra=5.97*(10**24) #kg
MasaLuna=7.349*(10**22) #kg
DTierraLuna= 384400
DTierraCohete= 154400
posLuna=numpy.array([0,DTierraLuna])
ci=numpy.array([numpy.array([15e6,1e6]),numpy.array([2e3,4e3])])
dt=0.1

Y,tiempo=heuz(0,13500,ci,dt,getDirCohete,G,MasaTierra,MasaLuna,posLuna)
pl.plot(Y[:,0][:,0],Y[:,0][:,1],label="distancia recorrida x/y",color="black")
pl.legend()
pl.grid()