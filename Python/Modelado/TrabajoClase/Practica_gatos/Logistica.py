# -*- coding: utf-8 -*-
# Clase       :    Logistica
# Version     :    v.0.10.03
# Autor       :    Victor Estevez
# Descripcion :    Clase que implementa algoritmo de aprendizaje automatico
#                  para probelmas de clasificacion.


import numpy
import matplotlib.pyplot as pl
from scipy.optimize import fmin_bfgs
import h5py
import warnings


class Logistica:

    def __init__(self):
        numpy.seterr(all="ignore")
        self.X = None
        self.y = None
        self.theta = None
        self.lambdaReg = None

    def inicializar_pesos(self):
        self.theta = numpy.ones(self.X.shape[1])+1

    def fit(self, x, y):
        m, n = x.shape
        self.X = numpy.concatenate([numpy.ones((m, 1)), x], axis=1)
        self.y = y.reshape(-1, 1)

    def cargar_pesos(self, archivo):
        data = h5py.File(archivo, "r")
        self.theta = data["Theta"][:]

    @staticmethod
    def sigmoide(h):
        return 1. / (1 + numpy.e ** (-h))

    def get_cross_entropy(self, theta):
        theta = theta.reshape(theta.size, 1)
        m = self.y.size
        h = self.sigmoide(self.X.dot(theta))
        parametro_regul = (self.lambdaReg / (2 * m)) * (numpy.power(self.theta, 2).sum())
        j = (1. / m) * (-self.y.transpose().dot(numpy.log(h)) - (1. - self.y).transpose().dot(numpy.log(1. - h)))
        j = j.sum() + parametro_regul
        return j

    def get_gradiente(self, theta):
        theta = theta.reshape(-1, 1)
        m = self.y.shape[0]
        h = self.sigmoide(self.X.dot(theta))
        grad = (1. / m) * self.X.transpose().dot(h - self.y)
        parametro_regul = (self.lambdaReg / m) * self.theta
        parametro_regul = parametro_regul.reshape(-1, 1)
        grad = grad + parametro_regul
        return grad.flatten()

    def entrenar(self, theta, algoritmo="bfgs", alpha="", itera="", epsilon=""):
        if algoritmo == "bfgs":
            self.theta = fmin_bfgs(self.get_cross_entropy, theta, fprime=self.get_gradiente)
        elif algoritmo == "descenso_gradiente":
            self.descenso_gradiente(theta, alpha, itera, epsilon)

    def descenso_gradiente(self, t_inic,  alpha, itera="", epsilon=10 ** (-6)):
        theta = t_inic
        js = []
        conta = 0

        while True:
            js.append(self.get_cross_entropy(theta))
            theta = theta - alpha * self.get_gradiente(theta)
            if itera == "":
                if abs(self.get_cross_entropy(theta) - js[-1]) < epsilon:
                    break
            else:
                if conta >= itera:
                    break
            conta += 1
        self.theta = theta
        param = h5py.File("pesos.h5", "w")
        param.create_dataset("Theta", self.theta)
        param.close()
        print("funcion costo minima: ", js[-1])
        print("Iteraciones: ", len(js))

    def clasificar(self, car):
        theta = self.theta.reshape(-1, 1)
        res = numpy.append(1, car)
        p = self.sigmoide(res.reshape(1, -1).dot(theta))
        if p > 0.5:
            return 1, p
        else:
            return 0, 1-p
