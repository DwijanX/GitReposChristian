import numpy
import matplotlib.pyplot as pl

class Regression:
    def __init__(self):
        self__X=None
        self__Y=None
        self__theta=None

    def fit(self,x,y):
        m,n=x.shape
        self.__X=numpy.ones((m,n+1))
        self.__X[:,1:]=x
        self.__Y=y.reshape(-1,1)
        self.__theta=numpy.zeros(n+1)
    def get_parametros(self):
        return self.__theta
    def set_parametros(self, t):
        self.__theta = t
    
    def get_h(self):
        theta=self.__theta.reshape(-1,1)
        h=self.__X.dot(theta)
        #print(self.__X)
        return h
    def Graph(self,index,modelo=False):
        pl.scatter(self.__X[:,index],self.__Y)
        if modelo:
            pl.plot(self.__X[:,index],self.get_h(),color="red")
        pl.grid()
    def get_j(self):
        m,n = self.__X.shape
        h = self.get_h()
        error = h - self.__Y
        j = 1 / (2 * m)* error ** 2
        return j.sum()
    def get_gradiente(self, theta):
        m,n = self.__X.shape
        h = self.get_h()
        error = h - self.__Y
        djdt = 1 / m * error.T.dot(self.__X)
        return djdt.ravel()

    def descenso_gradiente(self, alpha, epsilon=1.0e-6):
        js = []
        theta = self.__theta
        while True:
            js.append(self.get_j())
            theta = theta - alpha * self.get_gradiente(theta)
            if abs(self.get_j(theta) - js[-1]) < epsilon:
                break
            self.__theta = theta
        return numpy.array(js)

    def descenso_gradiente2(self, alpha, itera):
        js = []
        theta = self.__theta
        for i in range(itera):
            js.append(self.get_j())
            theta = theta - alpha * self.get_gradiente(theta)
            self.__theta = theta
        return numpy.array(js)
    def normalizar(self):
        self.__X[:,1:]=(self.__X[:,1:].mean(0)-self.__X[:,1:])/self.__X[:,1:].std(0)
