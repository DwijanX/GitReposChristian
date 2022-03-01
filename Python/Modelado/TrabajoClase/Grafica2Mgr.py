#%%
from time import time
from tkinter import N
from turtle import update
from Libs.EulerHeuz import heuz,euler,RungeKuta,Convection
from matplotlib import animation
import matplotlib.pyplot as pl
import html as HTML
from IPython.display import HTML

def DiferentialUnitaryStairFunction(x,ci,StairHeight,LowLim,TopLim,dx):
    Stair=StairHeight/dx
    ans=0
    if x==LowLim or (x<LowLim and x+dx>LowLim):
        ans=Stair
    if x==TopLim or (x>TopLim and x-dx<TopLim):
        ans=-Stair
    return ans

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

FirstUArray,FirstXArray=euler(0, L, cix, dx, DiferentialUnitaryStairFunction,1,LowLim,TopLim,dx)

UArray=Convection(FirstUArray,nt,dt,dx)

fig=pl.figure(figsize=(6.0,4.0))
line=pl.plot(FirstXArray,FirstUArray)[0]
pl.xlim(0,L)
pl.ylim(0.5,2.5)

def update_plot(n,hist):
    fig.suptitle('Tiempo {:0>2}'.format(n))
    pl.grid()
    line.set_ydata(hist[n])

anim=animation.FuncAnimation(fig,update_plot,frames=nt,fargs=(UArray,),interval=100)

HTML(anim.to_html5_video())


"""
pl.plot(FirstXArray,FirstUArray,label="inicial")
pl.plot(FirstXArray,UArray[0],label="final")
pl.legend()
pl.grid()"""