import h5py
import numpy


class RedNeuronal:

    def __init__(self):
        self.X = None
        self.y = None
        self.theta1 = None
        self.theta2 = None
        self.lambda_ = 0
        self.capa1 = None
        self.capa2 = None
        self.capa3 = None

    def fit(self, x, y):
        self.X = x
        self.y = y

    def sigmoide(self, z):
        s = 1 / (1 + numpy.exp(-z))
        return s

    def cargar_parametros(self, archivo):
        param = h5py.File(archivo, 'r')
        self.theta1 = param['Theta1'][:]
        self.theta2 = param['Theta2'][:]

    def predecir(self, imagen):
        a1 = numpy.concatenate([numpy.ones((1, 1)), imagen], axis=1)
        a2 = self.sigmoide(a1.dot(self.theta1.T))
        a2 = numpy.concatenate([numpy.ones((a2.shape[0], 1)), a2], axis=1)
        a3 = self.sigmoide(a2.dot(self.theta2.T))
        return a3.argmax()