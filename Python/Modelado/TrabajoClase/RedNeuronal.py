import h5py
import numpy
from scipy.optimize import minimize


class RedNeuronal:

    def __init__(self):
        self.X = None
        self.y = None
        self.theta1 = None
        self.theta2 = None
        self.lambda_ = 1
        self.capa1 = None
        self.capa2 = None
        self.capa3 = None

    # cargar variables caracteristicas y objetivo
    def fit(self, x, y):
        self.X = x
        self.y = y

    # inicializacion de parametros
    def inicializar_parametros(self, epsilon=0.12):
        self.theta1 = numpy.random.rand(self.capa2, (self.capa1 + 1)) * 2 * epsilon - epsilon
        self.theta2 = numpy.random.rand(self.capa3, (self.capa2 + 1)) * 2 * epsilon - epsilon

    # funcion de activacion sigmoide
    @staticmethod
    def sigmoide(z):
        return 1 / (1 + numpy.exp(-z))

    # derivada de la funcion sigmoide
    def derivada_sigmoide(self, z):
        return self.sigmoide(z) * (1 - self.sigmoide(z))

    # funcion costo: entropia cruzada, gradiente: back propagation
    def funcion_costo_gradiente(self, t):
        # re armado de los parametros segun topologia de la red
        t1 = numpy.reshape(t[0:self.capa2 * (self.capa1 + 1)], (self.capa2, (self.capa1 + 1)))
        t2 = numpy.reshape(t[self.capa2 * (self.capa1 + 1):], (self.capa3, (self.capa2 + 1)))

        # dimension de X
        m, n = self.X.shape

        # Computar h: front propagation
        a1 = numpy.concatenate([numpy.ones((m, 1)), self.X], axis=1)
        a2 = self.sigmoide(a1.dot(t1.T))
        a2 = numpy.concatenate([numpy.ones((a2.shape[0], 1)), a2], axis=1)
        h = self.sigmoide(a2.dot(t2.T))

        # vectorizar y
        y_vec = numpy.eye(self.capa3)[self.y.reshape(-1)]

        # computo del parametro de regularizacion, para contrarestar el sobre ajuste
        param_reg = (self.lambda_ / (2 * m)) * (numpy.sum(numpy.square(t1[:, 1:])) +
                                                numpy.sum(numpy.square(t2[:, 1:])))

        # computo del costo: entropia cruzada
        j = - 1 / m * numpy.sum(numpy.log(h) * y_vec + numpy.log(1 - h) * (1 - y_vec)) + param_reg

        # coputar el gradiente: back propagation
        # error en la ultima capa
        delta3 = h - y_vec
        # error en la penultima capa
        delta2 = delta3.dot(t2)[:, 1:] * self.derivada_sigmoide(a1.dot(t1.T))

        # computo errores en las capas acumulado
        delta_acum_1 = delta2.T.dot(a1)
        delta_acum_2 = delta3.T.dot(a2)

        # computo del gradiente
        grad1 = 1 / m * delta_acum_1
        grad2 = 1 / m * delta_acum_2

        #  penalización con el parametro de regularizacion
        grad1[:, 1:] = grad1[:, 1:] + (self.lambda_ / m) * t1[:, 1:]
        grad2[:, 1:] = grad2[:, 1:] + (self.lambda_ / m) * t2[:, 1:]

        # concatenar gradientes
        grad = numpy.concatenate([grad1.flatten(), grad2.flatten()])
        return j, grad

    # entrenamiento de la red, generacion de l modelo
    def entrenar(self, destino):
        # j_grad como funcion de alto orden
        j_grad = lambda p: self.funcion_costo_gradiente(p)

        # inicializar parametros
        theta_inical = numpy.concatenate([self.theta1.flatten(), self.theta2.flatten()])

        # maximo de iteraciones
        opciones = {'maxiter': 100}

        # computamos parametros optimos, minimizacion de la funcion costo
        res = minimize(j_grad, theta_inical, jac=True, method="TNC", options=opciones)
        theta_optimo = res.x

        # armamos el modelo segun topologia de la red
        self.theta1 = numpy.reshape(theta_optimo[0:self.capa2 * (self.capa1 + 1)], (self.capa2, (self.capa1 + 1)))
        self.theta2 = numpy.reshape(theta_optimo[self.capa2 * (self.capa1 + 1):], (self.capa3, (self.capa2 + 1)))

        # guardamos el modelo
        arch = h5py.File(destino, "w")
        arch.create_dataset("Theta1", data=self.theta1)
        arch.create_dataset("Theta2", data=self.theta2)

    # reconocimiento automatico: front propagation
    def predecir(self, imagen):
        a1 = numpy.concatenate([numpy.ones((1, 1)), imagen], axis=1)
        a2 = self.sigmoide(a1.dot(self.theta1.T))
        a2 = numpy.concatenate([numpy.ones((a2.shape[0], 1)), a2], axis=1)
        a3 = self.sigmoide(a2.dot(self.theta2.T)).T
        return a3.argmax(), a3[a3.argmax()]

    # cargar el modelo entrenado
    def cargar(self, archivo):
        arch = h5py.File(archivo, "r")
        self.theta1 = arch["Theta1"][:]
        self.theta2 = arch["Theta2"][:]
