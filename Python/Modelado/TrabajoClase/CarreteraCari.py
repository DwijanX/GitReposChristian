#%%
import numpy
import matplotlib.pyplot as pl
from matplotlib import animation
from IPython.display import HTML

#datos

#una carretera
nx = 41
L = 4 #km
dx = L/(nx-1)
nt = 30
Vmax = 1 #km/h
Pmax = 10
dt = 0.02
c = 1

x = numpy.linspace(0.0,L,nx)
x

u0 = numpy.ones(nx)
indices1 = numpy.where(numpy.logical_and(x >= 0, x<=2))
u0[indices1] = Pmax*x[indices1]/2
indices2 = numpy.where(numpy.logical_and(x >= 2, x<=4))
u0[indices2] = 0

pl.plot(x,u0)
pl.grid()
pl.show()

u = u0.copy()
for n in range(1,nt):
  u[1:] = u[1:]*Vmax*(1-u[1:]/Pmax)

pl.plot(x,u0,label="Densidad")
pl.plot(x,u,label="Finicial")
pl.grid()
pl.legend()
pl.show()

def conveccion(u0,nt):
  u = u0.copy()
  historial = [u0.copy()]
  for n in range(1,nt):
    u[1:] = u[1:] - u[1:]*dt/dx * (u[1:]-u[:-1])
    historial.append(u.copy())
  return historial

us = conveccion(u0, nt)

#mio
pl.plot(x,u0,label="Densidad")
pl.plot(x,us[0],label="F inicial")
pl.plot(x,us[-1],label="F final")
pl.legend()
pl.grid()

#probar
a=Vmax*u0
b=numpy.true_divide(u0,Pmax)
b=1-b
FArray=a*b
us = conveccion(FArray, nt)
pl.plot(x,u0,label="Densidad")
pl.plot(x,us[0],label="F inicial")
pl.plot(x,us[-1],label="F final")
pl.legend()
pl.grid()

fig = pl.figure(figsize=(6.0,4.0))
linea = pl.plot(x,u0)[0]
pl.xlim(0.0,L)
pl.ylim(0.5,1.2)