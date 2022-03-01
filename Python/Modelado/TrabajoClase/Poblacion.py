#%%
import numpy
import matplotlib.pyplot as pl

data=numpy.loadtxt("./Files/poblacion.csv", delimiter=",")

tiempo=data[:,0]-1790
poblacion=data[:,1]

k=numpy.log(5.3/3.9)/10

def getPob(p0,k,t):
    p=p0*numpy.exp(k*t)
    return p

t=numpy.linspace(0,200,100)
pob_simul=getPob(3.9,k,t)

#pl.scatter(tiempo,poblacion,color="red",label="real")
pl.grid()
pl.xlabel="tiempo"
pl.ylabel="poblacion"
pl.plot(t,pob_simul,color="blue",label="estimada")
pl.legend()




# %%
