#%%
import numpy
import matplotlib.pyplot as pl


A=numpy.array([[1402,191],[1371,821],[949,1437],[147,1448]])



data=numpy.loadtxt('..\Files\inmuebles01.csv',delimiter=',')
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
        sum=0
        for i in range(self.__len):
            sum+=theta[0]+theta[1]*self.__X[i]-self.__Y[i]
        J=sum**2/(2*self.__len)
        return J

r=Regression()
r.fit(x,y)
theta=numpy.array([0,0.005])
print(r.get_j(theta))
#r.Graph(True)