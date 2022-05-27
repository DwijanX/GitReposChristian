#%%
import matplotlib.pyplot as pl

import numpy as np

eje_x=["a","b","c","d","e"]
datos1=[10,20,20,40,50]
datos2=[20,30,40,50,60]
pl.plot(eje_x,datos1)
pl.plot(eje_x,datos2)
pl.show()
años=["2011","2012","2013","2014","2015",
        "2016","2017","2018","2019","2020"]

    
nivell=np.random.rand(10)*100
nivel2=np.random.rand(10)*200+100
nivel3=np.random.rand(10)*300+200    
nivel4=np.random.rand(10)*400+300
nivel5=np.random.rand(10)*500+400

pl.plot(años,nivell,label="nivel1",color="purple",marker="<")
pl.plot(años,nivel2,label="nivel2",color="red",marker="*")
pl.plot(años,nivel3,label="nivel3",color="blue",marker="^")
pl.plot(años,nivel4,label="nivel4",color="black",marker=".")
pl.plot(años,nivel5,label="nivel5",color="green",marker="+")
#Activar las Leyendas
pl.legend()
#Agregar Titulo al Grafico
pl.title("Calificacion por Nivel")
#Agregar Etiquetas de Ejes
pl.xlabel("Año de Examen")
pl.ylabel("Puntaje")
#Agregar Grilla
pl.grid()
pl.show()
eje_x=np.arange(0,10)
pl.bar(eje_x,nivel5,width=1/5)
pl.bar(eje_x+0.2,nivel4,width=1/5)
pl.bar(eje_x+0.4,nivel3,width=1/5)
pl.bar(eje_x+0.6,nivel2,width=1/5)
pl.bar(eje_x+0.8,nivell,width=1/5)
pl.show()