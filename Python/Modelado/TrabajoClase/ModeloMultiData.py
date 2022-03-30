#%%
from statistics import mean
import numpy
import matplotlib.pyplot as pl


data=numpy.loadtxt('../Files/datosMulti.txt',delimiter=',')
x=data[:,0:-1]
y=data[:,-1]




class Regression:
    def __init__(self):
        self__X=None
        self__Y=None
        self_theta=None

    def fit(self,x,y):
        m,n=x.shape
        self.__X=numpy.ones((m,n+1))
        self.__X[:,1:]=x
        self.__Y=y.reshape(-1,1)
        
        self.theta=numpy.zeros(n+1)

    def get_h(self):
        theta=self.theta.reshape(-1,1)
        h=self.__X.dot(theta)
        #print(self.__X)
        return h
    def Graph(self,modelo=False):
        pl.scatter(self.__X,self.__Y)
        if modelo:
            pl.plot(self.__X,self.get_h(),color="red")
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
        theta = self.theta
        while True:
            js.append(self.get_j())
            theta = theta - alpha * self.get_gradiente(theta)
            if abs(self.get_j(theta) - js[-1]) < epsilon:
                break
            self.theta = theta
        return numpy.array(js)

    def descenso_gradiente2(self, alpha, itera):
        js = []
        theta = self.theta
        for i in range(itera):
            js.append(self.get_j())
            theta = theta - alpha * self.get_gradiente(theta)
        self.theta = theta
        return numpy.array(js)
    def normalizar(self):
        Mean=self.__X.mean(1)
        dsvStd=self.__X.std(1)
        for i in range(len(Mean)):
            self.__X[:,1]=(Mean-self.__X)/dsvStd
        print(ans)
        return ans


r=Regression()
r.fit(x,y)
historial=r.descenso_gradiente2(0.01,400)
print(r.normalizar())