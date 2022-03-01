#%%
from Libs.EulerHeuz import heuz,euler,RungeKuta
import numpy
import matplotlib.pyplot as pl

def Mp(t,mp0,dmpdt):
    ans=mp0-dmpdt*t
    if ans<0:
        ans=0
    return ans

def dep_pres(t, ci,mc,g,Ve,k,r,P,mp0,dmpdt):  #ci[v0,y0]

    masaProp=Mp(t,mp0,dmpdt)
    a=-g
    b=masaProp*Ve/(mc+masaProp)
    c=-(k*P*numpy.pi*(r**2)*abs(ci[0])*ci[0])/(2*(mc+masaProp))
    #print(c)
    dvdt = a+b+c
    dydt=ci[0]
    return numpy.array([dvdt,dydt])



ci=numpy.array([0,0])
mc,g,Ve,k,r,P=50,9.81,97.2222,12,0.5,1.98
mp0=100
dmpdt=20

Y,tiempo=heuz(0, 20, ci, 0.1, dep_pres, mc,g,Ve,k,r,P,mp0,dmpdt)

pl.plot(tiempo,Y[:,0],label="Velocidad m/s")
pl.plot(tiempo,Y[:,1],label="Altura",color="red")
pl.legend()
pl.grid()