#%%
from pickle import NONE
from turtle import color
import numpy
import matplotlib.pyplot as pl
import h5py
import scipy.optimize

#data=h5py.File("Python\Modelado\Files\data03.h5",'r')
data=h5py.File("../Files/data04.h5",'r')

#print(data.keys())
X=data["X"][:]
y=data["y"][:]

#print(X.shape)


class Logistica:
    def __init__(self):
        self.__X=NONE
        self.__y=NONE
        self.__Theta=NONE
        self.__lamb_param = 0

    def fit(self,x,y):
        m, n = x.shape
        self.__y = y.reshape(-1, 1)
        self.__X = numpy.append(numpy.ones((m, 1)), x, axis=1)

    def InicializarParametros(self):
        self.__Theta=numpy.ones(self.__X.shape[1])
    def getphi(self, X,grado):
        m, n = X.shape
        x1 = (X[:, 1].reshape(m, 1))
        x2 = (X[:, 2].reshape(m, 1))
        salida = numpy.ones((m, 1))
        
        for i in range(1, grado + 1):
            for j in range(i + 1):
                r = (x1 ** (i - j)) * (x2 ** j)
                salida = numpy.append(salida, r, axis=1)
        return salida
    
    def graficarConjunto(self,Model=False):
        pos_indices = numpy.where(self.__y == 1)
        neg_indices = numpy.where(self.__y == 0)
        pl.scatter(self.__X[pos_indices, 1], self.__X[pos_indices, 2], color='red')
        pl.scatter(self.__X[neg_indices, 1], self.__X[neg_indices, 2], color='blue')
        
        if Model:
            u = numpy.linspace(-1, 1.2, 50)
            v = numpy.linspace(-1, 1.2, 50)
            r = numpy.ones((1, 3))
            Z = numpy.zeros((50, 50))
            for i in range(50):
                for j in range(50):
                    r[0, 1] = u[i]
                    r[0, 2] = u[j]
                    ft = self.getphi(r, 6)
                    Z[i, j] = ft.dot(self.__Theta.reshape(-1,1))
            pl.contour(u, v, Z, levels=[0])
        pl.grid()

    def getParametros(self):
        return self.__Theta
    def getSignoide(self,z):
        g=1/(1+numpy.exp(-z))
        return g
    def set_lambda(self, l):
        self.__lamb_param = l
    def getCrossEntropy(self,theta):
        theta = theta.reshape(-1, 1)
        m, n = self.__X.shape
        h = self.getSignoide(self.__X.dot(theta))
        param_regul = self.__lamb_param / (2 * m) * numpy.power(self.__Theta, 2).sum()
        j = -1 / m * (self.__y.T.dot(numpy.log(h)) + (1 - self.__y).T.dot(numpy.log(1 - h)))
        return j.sum()  + param_regul

    def get_gradiente(self, theta):
        theta = theta.reshape(-1, 1)
        m, n = self.__X.shape
        h = self.getSignoide(self.__X.dot(theta))
        param_reg = self.__lamb_param / m * self.__Theta
        grad = (1. / m) * self.__X.T.dot(h - self.__y)
        return grad.flatten()  + param_reg.flatten()

    def descenso_gradiente(self, alpha, epsilon=1.0e-6):
        js = []
        theta = self.__Theta
        while True:
            js.append(self.getCrossEntropy(theta))
            theta = theta - alpha * self.get_gradiente(theta)
            if abs(self.getCrossEntropy(theta) - js[-1]) < epsilon:
                break
            self.__Theta = theta
        return numpy.array(js)

    def descenso_gradiente2(self, alpha, itera):
        js = []
        theta = self.__Theta
        for i in range(itera):
            js.append(self.getCrossEntropy(theta))
            theta = theta - alpha * self.get_gradiente(theta)
            self.__Theta = theta
        return numpy.array(js)
    def setLambda(self,Lambda):
        self.__lamb_param = l

    def entrenar(self):
        self.__Theta = scipy.optimize.fmin_bfgs(self.getCrossEntropy, self.__Theta, fprime=self.get_gradiente)
    
    def cambiar_kernel(self, grado):
        self.__X = self.getphi(self.__X, grado)
        self.__Theta = numpy.ones(self.__X.shape[1])
    

l=Logistica()
l.fit(X,y)
l.set_lambda(0.1)
l.cambiar_kernel(6)
l.entrenar()
l.graficarConjunto(True)
#historial=l.descenso_gradiente2(0.01,1000000)
#l.descenso_gradiente(0.01)
#pl.plot(range(historial.size),historial)
#print(l.getParametros())

#l.graficarConjunto(True)
# %%
