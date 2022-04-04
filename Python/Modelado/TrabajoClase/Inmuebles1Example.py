#%%
import numpy
import matplotlib.pyplot as pl


A=numpy.array([[1402,191],[1371,821],[949,1437],[147,1448]])



data=numpy.loadtxt('../Files/datos01.txt',delimiter=',')
x=data[:,0]
y=data[:,1]



class Regression:
    def __init__(self):
        self__X=None
        self__Y=None
        self_theta=None
        len=None

    def fit(self,x,y):
        self.__X=x
        self.__Y=y
        self.__len=len(x)
        self.theta=numpy.array([-2,3.4])

    def get_h(self):
        return self.theta[0]+self.theta[1]*self.__X
    def Graph(self,modelo=False):
        pl.scatter(self.__X,self.__Y)
        if modelo:
            pl.plot(self.__X,self.get_h(),color="red")
        pl.grid()
    def get_j(self,theta):
        h = theta[0] + theta[1] * self.__X
        error = h - self.__Y
        j = 1 / (2 * self.__len)* error ** 2
        return j.sum()
    def get_gradiente(self, theta):
        h = theta[0] + theta[1] * self.__X
        error = h - self.__Y
        djdt0 = 1 / self.__len * error
        djdt1 = 1 / self.__len * error * self.__X
        return numpy.array([djdt0.sum(), djdt1.sum()])

    def descenso_gradiente(self, alpha, epsilon=1.0e-6):
        js = []
        theta = self.theta
        while True:
            js.append(self.get_j(self.theta))
            theta = theta - alpha * self.get_gradiente(theta)
            if abs(self.get_j(theta) - js[-1]) < epsilon:
                break
            self.theta = theta
        return numpy.array(js)

    def descenso_gradiente2(self, alpha, itera):
        js = []
        theta = self.theta
        for i in range(itera):
            js.append(self.get_j(self.theta))
            theta = theta - alpha * self.get_gradiente(theta)
            self.theta = theta
        return numpy.array(js)
    

r=Regression()
r.fit(x,y)
theta=numpy.array([0,0.005])
r.theta=theta
saltos=1000
historial=r.descenso_gradiente2(0.01,saltos)
pl.plot(range(saltos),historial)
#r.Graph(True)