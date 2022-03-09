#%%
from Libs.EulerHeuz import heuz,euler,RungeKuta
import numpy
import matplotlib.pyplot as pl

#ci[theta,v,x,y]
def getDirPlane(t, ci,cd,cl,ve,g):  #ci[v0,y0]
    dvdt=-g*numpy.sin(ci[0])-(cd/cl)*(g/ve**2)*(ci[1]**2)
    dOdt=-g/ci[1]*numpy.cos(ci[0])+(ci[1])*g/ve**2 
    dxdt=ci[1]*numpy.cos(ci[0])
    dydt=ci[1]*numpy.sin(ci[0])
    return numpy.array([dOdt,dvdt,dxdt,dydt])


cd=1/4
cl=1.0
ve=325
vt=300
g=9.81
dt=0.01
ci = numpy.array([0, vt, 0, 1000])
Y,tiempo=heuz(0, 1000, ci, dt, getDirPlane,cd,cl,vt,g)

#pl.plot(tiempo,Y[:,0],label="Theta")
#pl.plot(Y[:,0],Y[:,1],label="Theta")
pl.plot(tiempo,Y[:,1],label="Velocidad",color="red")
#pl.plot(Y[:,3],Y[:,2],label="desplazamiento",color="green")
pl.legend()
pl.grid()