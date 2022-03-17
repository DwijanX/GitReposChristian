#%%
from Libs.EulerHeuz import heuz,euler,RungeKuta
import numpy
import matplotlib.pyplot as pl

dist_Luna=1.74e6
periodo_Lunar=29*24*3600
theta=numpy.pi/180

def get_movLunar(t,t0):
    theta=t0+2*numpy.pi*t/periodo_Lunar
    posx=dist_Luna*numpy.cos(theta)
    posy=dist_Luna*numpy.sin(theta)
    return numpy.array([posx,posy])





t=numpy.linspace(0,periodo_Lunar,100)
Resultados=get_movLunar(t,0)
pl.plot(Resultados[0,:],Resultados[1,:])
pl.grid()
