#%%
from Logistica import *
import h5py
import matplotlib.pyplot as pl

# 1. Cargar y mostrar conjunto entreenamiento
clasificador = Logistica()
clasificador.lambdaReg = 0
data = h5py.File("data/gatillos_train.h5", 'r')

x = data["train_set_x"][:]
x = x.reshape(-1,64*64*3)
x = x / 255
clasificador.fit(x, data['train_set_y'][:])
clasificador.inicializar_pesos()
# 3.
print("Mostrar costo y Gradiente:")
print("costo: ", clasificador.get_cross_entropy(clasificador.theta))
print("Gradiente: ", clasificador.get_gradiente(clasificador.theta).shape)
print(clasificador.theta.shape)
#
# 4
print("Entrenar algoritmo: ")

 # 5. Encontrar parametros optimos


# 5.2. Aplicacion de bfgs implementacion en scipy
print("*********************************")
# print("Algoritmo Bfgs")
# inicial = numpy.ones(clasificador.theta.size)
# clasificador.entrenar(inicial, algoritmo="bfgs")
# print(clasificador.theta.shape, " tam resul ")
# pl.imshow(x[188, :].reshape(64,64,3))
# pl.show()
# print(clasificador.clasificar(x[188, :].reshape(-1, 1)))

# clasificador.graficar_conjunto(True)
#
# # 5.1. Aplicacion del algoritmo del descenso de gradiente
inicial = numpy.zeros(clasificador.theta.size)
print("*********************************")
print("Iniciando Algoritmo descenso de gradiente.........")
print(clasificador.lambdaReg)
clasificador.entrenar(inicial, algoritmo="descenso_gradiente", alpha=0.01, epsilon=10 ** (-6))
pl.imshow(x[188, :].reshape(64, 64, 3))
pl.show()
print(clasificador.clasificar(x[188, :].reshape(-1, 1)))
#
