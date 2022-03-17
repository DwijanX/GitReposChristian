#%%
from Libs.EulerHeuz import heuz,euler,RungeKuta
import numpy
import matplotlib.pyplot as pl

#S Sano
#E expuesto
#I INFECTED
#R Recovered
#ci[S,I,R]
def getCovid(t,ci,B,Recuperacion):
    dsdt=-B*ci[0]/8000*ci[1]
    dIdt=abs(dsdt)-Recuperacion*ci[1]
    dRdt=Recuperacion*ci[1]
    return numpy.array([dsdt,dIdt,dRdt])


N=7996
#Incubacion=1/7
Recuperacion=1/7
B=1
ci=numpy.array([N,4,0])

Y,tiempo=euler(0,100,ci,0.01,getCovid,B,Recuperacion)

pl.plot(tiempo,Y[:,0],label="Sanos")
#pl.plot(tiempo,Y[:,1],label="expuestos")
pl.plot(tiempo,Y[:,1],label="infectados")
pl.plot(tiempo,Y[:,2],label="recuperados")
print(Y[:,0])
pl.grid()
pl.legend()





