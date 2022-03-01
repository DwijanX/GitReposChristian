#%%
from time import time
from Libs.EulerHeuz import heuz,euler,RungeKuta,Convection
import numpy
import matplotlib.pyplot as pl

def DiferentialUnitaryStairFunction(x,ci,StairHeight,LowLim,TopLim,dx):
    Stair=StairHeight/dx
    ans=0
    if x==LowLim or (x<LowLim and x+dx>LowLim):
        ans=Stair
    if x==TopLim or (x>TopLim and x-dx<TopLim):
        ans=-Stair
    return ans

def DuOvrdtdx(t,ci,dt,C,dx,L,cix,LowLim,TopLim,StairHeight):
    MainUVector,MainXVector=euler(0, L, cix, dx, DiferentialUnitaryStairFunction,StairHeight,LowLim,TopLim,dx)
    ans=C*(MainUVector-ci[0])
    return numpy.array([ans,MainXVector])
    
def DuOvrdtdx2(t,ci,dt,C,dx,L,cix,LowLim,TopLim,StairHeight):
    PresentUVector,PresentXVector=euler(0, L, cix, dx, DiferentialUnitaryStairFunction,StairHeight,LowLim,TopLim,dx)
    ans=PresentUVector+C*(PresentUVector-ci[0])
    ansXVector=PresentXVector+C*(PresentXVector-ci[1])
    return numpy.array([ans,ansXVector])



nt=25
dt=0.02
c=1
nx=41
L=2
dx=L/(nx-1)
cix=1
LowLim=0.5
TopLim=1.0
StairHeight=1

Convection

FirstUArray,FirstXArray=euler(0, L, cix, dx, DiferentialUnitaryStairFunction,1,LowLim,TopLim,dx)
ci=numpy.array([FirstUArray,FirstXArray])
MainUXArray,MainYArray=euler(0, 25, ci, dx/dt, DuOvrdtdx,dt,c,dx,L,cix,LowLim,TopLim,StairHeight)
#MainUXArray,MainYArray=Convection(0, 25, ci, dx/dt, DuOvrdtdx2,dt,c,dx,L,cix,LowLim,TopLim,StairHeight)

pl.plot(MainUXArray[5][1],MainUXArray[0][0])
pl.legend()
pl.grid()