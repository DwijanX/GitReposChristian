#%%
from cmath import sqrt

from Libs.EulerHeuz import heuz,euler,RungeKuta
import numpy
import matplotlib.pyplot as pl


def dvdtComponent(MObj1,Pos1To2):
    return G*MObj1*Pos1To2/numpy.linalg.norm(Pos1To2)**3

#ci[pos,vel]
def get_dvdt(t,ci,G,MT):
    vectorTierra=-ci[0]
    dist_Tierra=numpy.sqrt(vectorTierra[0]**2+vectorTierra[1]**2)
    dvdt=G*MT*vectorTierra/dist_Tierra**3
    dydt=ci[1]
    return numpy.array([dydt,dvdt])


#ci=>[Velocidad,[Posicion]]
def Cohete(t,ci,G,Mt,ML,PosTierra,PosLuna):
    Nave=-ci[1]
    NaveTierra=PosTierra-ci[1]
    DistanciaNaveTierra=numpy.linalg.norm(PosTierra-ci[1])
    LunaTierra=PosLuna-ci[1]
    DistanciaNaveLuna=numpy.linalg.norm(PosLuna-ci[1]).real
    a=(G*Mt/DistanciaNaveTierra**2)*(Nave/numpy.linalg.norm(Nave))
    #a=G*Mt*NaveTierra/DistanciaNaveTierra**3
    b=G*ML*LunaTierra/DistanciaNaveLuna**3
    dvdt=a+b
    dxdt=ci[0]
    return numpy.array([dvdt,dxdt])

DTierraLuna= 384400
DTierraCohete= 154400
PosicionTierra=numpy.array([0,0,0],dtype=numpy.double)
PosicionLuna=numpy.array([0,DTierraLuna,0],dtype=numpy.double)
PosicionCohete=numpy.array([-DTierraCohete,0,0],dtype=numpy.double)
G=6.667*(10)**(-11)# N*M^2/kg^2
MasaTierra=5.972*(10**24) #kg
MasaLuna=7.349*(10**22) #kg

def GetVeloInicial(MasaObj,ArrayDistance):
    a=sqrt(G*MasaObj/numpy.linalg.norm(ArrayDistance))
    return a

MagnitudVelocidad = sqrt(G*MasaTierra/DTierraCohete).real

MagnitudVelocidadNave = GetVeloInicial(MasaTierra,(PosicionTierra-PosicionCohete)) 
MagnitudVelocidadNave2 = GetVeloInicial(MasaLuna,(PosicionLuna-PosicionCohete))
VelocidadNave = numpy.array([0,MagnitudVelocidadNave,0])

ci=numpy.array([VelocidadNave,PosicionCohete])
T = 2*numpy.pi*DTierraCohete/MagnitudVelocidad
dt = T/100


Y,tiempo=heuz(0,10*T,ci,dt,Cohete,G,MasaTierra,MasaLuna,PosicionTierra,PosicionLuna)

pl.plot(tiempo,Y[:,0][:,0],label="Velocidad en X",color="red")
pl.plot(tiempo,Y[:,0][:,1],label="Velocidad en Y",color="blue")
pl.plot(tiempo,Y[:,0][:,2],label="Velocidad en Z",color="black")



pl.plot(tiempo,Y[:,1][:,0],label="distancia recorrida en X",color="red")
pl.plot(tiempo,Y[:,1][:,1],label="distancia recorrida en Y",color="blue")
pl.plot(tiempo,Y[:,1][:,2],label="distancia recorrida en Z",color="black")
pl.plot(Y[:,1][:,0],Y[:,1][:,1],label="distancia recorrida x/y",color="black")

pl.legend()
pl.grid()
