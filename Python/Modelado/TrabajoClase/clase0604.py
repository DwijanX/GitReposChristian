#%%
from pickle import NONE
from turtle import color
import numpy
import matplotlib.pyplot as pl
import h5py

#data=h5py.File("Python\Modelado\Files\data03.h5",'r')
data=h5py.File("../Files/data03.h5",'r')

#print(data.keys())
X=data["X"][:]
y=data["y"][:]

#print(X.shape)


class Logistica:
    def __init__(self):
        self.__X=NONE
        self.__y=NONE
        self.__Theta=NONE
    def fit(self,x,y):
        m,n=x.shape
        self.__X=numpy.append(numpy.ones((m,1)),x,axis=1)
        self.__y=y.reshape(-1,1)
    def InicializarParametros(self):
        self.__Theta=numpy.ones(self.__X.shape[1])

    def graficarConjunto(self,Model=False):
        pos_Index=numpy.where(self.__y==1)
        neg_Index=numpy.where(self.__y==0)
        if(Model):
            pl.plot([0,-self.__Theta[0]/self.__Theta[1]],[self.__Theta[1]/self.__Theta[2],0])
        pl.scatter(self.__X[pos_Index,1],self.__X[pos_Index,2],color='red')
        pl.scatter(self.__X[neg_Index,1],self.__X[neg_Index,2],color='blue')
        pl.grid()
    def getSignoide(self,z):
        g=1/(1+numpy.exp(-z))
        return g
    def getCrossEntropy(self,theta):
        m,n=self.__X.shape
        theta=theta.reshape(-1,1)
        h=self.getSignoide(self.__X.dot(theta))
        j=1/m*(-self.__y.T.dot(numpy.log(h))-(1-self.__y).T.dot(numpy.log(1-h)))
        return j.sum()
    def get_gradiente(self, theta):
        m,n = self.__X.shape
        h = self.getSignoide(self.__X.dot(theta))
        print(h.shape)
        print(self.__y.shape)
        error = h - self.__y
        djdt = 1 / m * error.T.dot(self.__X)
        return djdt.ravel()

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
    

l=Logistica()
l.fit(X,y)
l.InicializarParametros()
l.descenso_gradiente2(0.01,1000)
l.graficarConjunto(True)