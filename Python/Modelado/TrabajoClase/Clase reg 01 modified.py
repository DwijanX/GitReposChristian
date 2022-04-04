# -*- coding: utf-8 -*-
import numpy
import matplotlib.pyplot as pl

pl.style.use('ggplot')

"""# Algoritmo descenso de gradiente - Regresion Lineal

Modelo: 
$$h(X) = \theta_0 + \theta_1 X$$

funcion loss $J(\theta_0, \theta_1)$

$$J(\theta_0, \theta_1) = \frac{1}{2m} \sum_{i=0}^{m}(\theta_0 + \theta_1 X^{(i)} - y^{(i)})^2$$

Gradiente 

$$\nabla_{\theta} J_{(\theta_0, \theta_1)} =  [\frac{\partial }{\partial \theta_0} J{(\theta_0, \theta_1)}, \frac{\partial }{\partial \theta_1}J_{(\theta_0, \theta_1)}]$$

$$\nabla_{\theta} J_{(\theta_0, \theta_1)} =  [\frac{1}{m} \sum_{i=0}^m (\theta_0 + \theta_1 x^{(i)} - y^{(i)})^2 , \frac{1}{m} \sum_{i=0}^m (\theta_0 + \theta_1 x^{(i)})^2 x^{(i)}]$$
"""

class Regresion:
    
    
    # cosntructor de la clase Regresion
    def __init__(self):
        self.__X = None # atributo: variable caracteristica (feature) X
        self.__y = None # atributo: variable objetivo (target) y
        self.__theta = None # atributo: parametros del modelo

    # cargar conjunto entrenamiento    
    def fit(self, x, y):
        self.__X = x
        self.__y = y
        self.__theta = numpy.zeros(2) # [theta_0, theta_1]

    # devolver los parametros del modelo
    def get_parametros(self):
        return self.__theta

    # inicializar los parametros en [0,0]
    def iniciar_parametros(self):
        self.__theta = numpy.zeros(2)

    # asignar parametros
    def set_parametros(self, t):
        self.__theta = t

    # devolver el valor del modelo, dada un nuevo valor caractaristica
    def get_h(self, x):
        h = self.__theta[0] + self.__theta[1] * x
        return h

    # devolver valor de la funcion costo J(theta) (loss
    def get_j(self, theta):
        m = self.__y.size
        h = theta[0] + theta[1] * self.__X
        error = h - self.__y
        j = (1. / (2 * m)) * numpy.power(error, 2).sum()
        return j

    # devolver la dirección (gradiente) de J(theta)
    def get_gradiente(self, theta):
        m = self.__y.size
        h = theta[0] + theta[1] * self.__X
        t0 = 1. / m * (h - self.__y)
        t1 = 1. / m * (h - self.__y) * self.__X
        return numpy.array([t0.sum(), t1.sum()])

    # algoritmo de entrenamiento del modelo, descenso de gradiente
    # iniciamos theta en el parametro actual
    # realizamos salto de mañaño alpha, en la direccion del gradiente actualizando theta
    # computamos el costo J() con el theta actual, almacenamos en historial
    
    def descenso_gradiente(self, alpha, itera):
        theta = self.__theta
        js = []
        for i in range(itera):
            theta[0] = theta[0] - alpha * self.get_gradiente(theta)[0]
            theta[1] = theta[1] - alpha * self.get_gradiente(theta)[1]
            js.append(self.get_j(theta))
        self.__theta = theta.flatten()
        return numpy.array(js)

    # mismo que el anterior, pero en este caso convergencia tiene la condición j < epsilon
    def descenso_gradiente2(self, alpha, epsilon=1.0e-6):
        theta = self.__theta
        js = []
        while True:
            js.append(self.get_j(theta))
            theta[0] = theta[0] - alpha * self.get_gradiente(theta)[0]
            theta[1] = theta[1] - alpha * self.get_gradiente(theta)[1]
            if abs(self.get_j(theta) - js[-1]) < epsilon:
                break
        self.__theta = theta.flatten()
        return numpy.array(js)

    # predecir: resultado del modelo, dado un nuevo tamaño
    def predecir(self, x):
        res = self.get_h(float(x))
        return res

    # graficar conjunto entrenamiento y el modelo actual
    def graficar_conjunto(self, modelo=False):
        pl.scatter(self.__X, self.__y, label="dataset")
        if modelo:
            pl.plot(self.__X, self.get_h(self.__X), color="blue", label="modelo")
        pl.ylabel("X: Variable caracteristica (feature)")
        pl.xlabel("y: Variable objetivo (targed)")
        pl.legend()
        pl.show()
        
        
    # graficar comportamiento del historial de costos
    @staticmethod
    def graficar_historial_j(js):
        iteraciones = numpy.arange(js.size)
        pl.plot(iteraciones, js)
        pl.xlabel("Iteraciones")
        pl.ylabel(r"J(\theta)")
        pl.show()

    # graficar j(theta), en 3D    
    def graficar_j_3d(self):
        fig = pl.figure()
        ax = fig.gca(projection='3d')
        theta0 = numpy.linspace(-10, 10, 100)
        theta1 = numpy.linspace(-1, 4, 100)

        theta0, theta1 = numpy.meshgrid(theta0, theta1)
        j_costo = numpy.zeros((100, 100))

        for i in range(100):
            for j in range(100):
                t = numpy.array([theta0[i, j], theta1[i, j]])
                j_costo[i, j] = self.get_j(t)
        ax.scatter(self.__theta[0], self.__theta[1], self.get_j(self.__theta), c="blue")
        ax.plot_surface(theta0, theta1, j_costo)

        pl.xlabel("Theta0")
        pl.ylabel("Theta1")
        pl.show()

    # graficar j(theta), curvas    
    def graficar_j_curvas(self):
        theta0 = numpy.linspace(-10, 10, 100)
        theta1 = numpy.linspace(-1, 4, 100)
        theta0, theta1 = numpy.meshgrid(theta0, theta1)
        j_costo = numpy.zeros((100, 100))

        for i in range(100):
            for j in range(100):
                t = numpy.array([theta0[i, j], theta1[i, j]])
                j_costo[i, j] = self.get_j(t)

        pl.contour(theta0, theta1, j_costo, numpy.logspace(-2, 3, 20))
        pl.scatter(self.__theta[0], self.__theta[1], c="blue")
        pl.xlabel("Theta0")
        pl.ylabel("Theta1")
        pl.show()
