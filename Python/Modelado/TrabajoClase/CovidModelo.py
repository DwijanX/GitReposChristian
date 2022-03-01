#%%
import numpy
import matplotlib.pyplot as pl

def getPob(p0,k,t):
    p=p0*numpy.exp(k*t)
    return p



data=numpy.loadtxt("./Files/CasosBoliviaExtendido.csv", delimiter=",", skiprows=1)

tiempo=data[:,0]
Contagiados=data[:,1]

ContagiadosInicial=2

k=numpy.log(577808/2)/657  



t=numpy.linspace(1,700,700)

pob_simul=getPob(ContagiadosInicial,k,t)

pl.xlabel="tiempo"
pl.ylabel="poblacion"
pl.scatter(tiempo,Contagiados,color="red",label="Contagiados reales")
pl.grid()
pl.plot(t,pob_simul,color="blue",label="Contagiados estimados")
pl.legend()




# %%
