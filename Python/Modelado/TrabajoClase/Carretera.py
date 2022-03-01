#%%
from Libs.EulerHeuz import heuz,euler,RungeKuta,Convection
import numpy
import matplotlib.pyplot as pl

"""

nt=25
dt=0.02
c=1
dx=L/(nx-1)
cix=1
LowLim=0.5
TopLim=1.0
StairHeight=1
"""


nx=81
L=4
dx=L/(nx-1)
nt=30
Vmax=1
Pmax=10
dt=0.02


XArray=numpy.linspace(0,L,nx)
PArray=[]
for i in XArray:
    if i>=0 and i<=2:
        PArray.append(Pmax*i/2)
    else:
        PArray.append(0)
PArray=numpy.array(PArray)






a=Vmax*PArray
b=numpy.true_divide(PArray,Pmax)
b=1-b

print(a)
print(b)
FArray=a*b
FArrayOvrTime=Convection(FArray,nt,dt,dx)

pl.plot(XArray,PArray,label="Densidad")
pl.plot(XArray,FArrayOvrTime[0],label="F inicial")
pl.plot(XArray,FArrayOvrTime[-1],label="F final")
pl.legend()
pl.grid()


