#%%
from random import randint
import matplotlib.pyplot as pl
import numpy
"""
aprobado=0
total=10000000
for i in range(total):
    if randint(0,1)+randint(0,1)+randint(0,1)+randint(0,1)==3:
        aprobado+=1
print(aprobado/total)"""

N=10000
x,y=numpy.random.uniform(-1,1,size=(2,N))
interior=(x**2+y**2)<=1

mi_pi=(interior*4)/N
print(mi_pi)
exterior=numpy.invert(interior)
pl.plot(x[interior],y[interior],color="Red")
pl.axis('square')
