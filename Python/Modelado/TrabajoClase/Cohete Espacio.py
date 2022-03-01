#%%
from cmath import sqrt
from inspect import getmodule
from turtle import distance

from zmq import HEARTBEAT_IVL
from Libs.EulerHeuz import heuz,euler,RungeKuta
import numpy
import matplotlib.pyplot as pl

#ci=>[Velocidad,[Posicion]]
def Cohete(t,ci,G,Mt,ML,PosTierra,PosLuna):
    NaveTierra=PosTierra-ci[1]
    DistanciaNaveTierra=numpy.linalg.norm(PosTierra-ci[1])
    DistanciaNaveLuna=numpy.linalg.norm(PosLuna-ci[1]).real
    a=G*Mt*NaveTierra/DistanciaNaveTierra**3
    b=(G*ML/(DistanciaNaveLuna**2))*((PosLuna-ci[1])/DistanciaNaveLuna)
    dvdt=a+b
    dxdt=ci[0]
    return numpy.array([dvdt,dxdt])


DTierraLuna= 384400
DTierraCohete= 154400
PosicionTierra=numpy.array([0,0,0],dtype=numpy.double)
PosicionLuna=numpy.array([0,DTierraLuna,0],dtype=numpy.double)
PosicionCohete=numpy.array([DTierraCohete,0,0],dtype=numpy.double)
G=6.667*(10)**(-11)# N*M^2/kg^2
MasaTierra=5.972*(10**24) #kg
MasaLuna=200.349*(10**22) #kg

def GetVelo(MasaObj,ArrayDistance):
    a=sqrt(G*MasaObj/numpy.linalg.norm(ArrayDistance)).real
    return a

MagnitudVelocidad = sqrt(G*MasaTierra/DTierraCohete).real

MagnitudVelocidadNave = GetVelo(MasaTierra,(PosicionTierra-PosicionCohete)) 
MagnitudVelocidadNave2 = GetVelo(MasaLuna,(PosicionLuna-PosicionCohete))
VelocidadNave = numpy.array([-MagnitudVelocidadNave2,MagnitudVelocidadNave,0])

ci=numpy.array([VelocidadNave,PosicionCohete])
T = 2*numpy.pi*DTierraCohete/MagnitudVelocidad
dt = T/100


Y,tiempo=heuz(0,10*T,ci,dt,Cohete,G,MasaTierra,MasaLuna,PosicionTierra,PosicionLuna)
#"""
pl.plot(tiempo,Y[:,0][:,0],label="Velocidad en X",color="red")
pl.plot(tiempo,Y[:,0][:,1],label="Velocidad en Y",color="blue")
pl.plot(tiempo,Y[:,0][:,2],label="Velocidad en Z",color="black")
#"""


"""
pl.plot(tiempo,Y[:,1][:,0],label="distancia recorrida en X",color="red")
pl.plot(tiempo,Y[:,1][:,1],label="distancia recorrida en Y",color="blue")
pl.plot(tiempo,Y[:,1][:,2],label="distancia recorrida en Z",color="black")
"""
pl.legend()
pl.grid()