import numpy
import matplotlib.pyplot

def dvdt(t,v0,g,k,m):
    return g-k/m*v0

def euler(t0, tf, ci, dt, direccion, *args):
    futuros = []
    tiempos = []
    while True:
        futuros.append(ci)
        tiempos.append(t0)
        if (t0 + dt) > tf:
            dt = tf - t0
        pendiente = direccion(t0, ci, *args)
        ci = ci + dt * pendiente 
        t0 = t0 + dt
        if (t0 >= tf):
            break
    return numpy.array(futuros), numpy.array(tiempos)


g=9.81
m=66
k=12.5

futuros,tiempos=euler(0,50,0,0.1,dvdt,g,k,m)