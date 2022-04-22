#%%
from pickle import NONE
from turtle import color
from unicodedata import digit
import numpy
import matplotlib.pyplot as pl
import h5py
import scipy.optimize

#data=h5py.File("Python\Modelado\Files\data03.h5",'r')
data=h5py.File("../Files/digitos.h5",'r')

#print(data.keys())
X=data["X"][:]
y=data["y"][:]


#print(X.shape)
digito=numpy.ones((401,1))
digito[1:]=X[1234,:].reshape(-1,1)


#print(digito.shape)
#pl.imshow(digito.T)


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
    
    
    def getParametros(self):
        return self.__Theta
    def getSignoide(self,z):
        g=1/(1+numpy.exp(-z))
        return g
    def set_lambda(self, l):
        self.__lamb_param = l
    def getCrossEntropy(self,theta,etiqueta):
        y=self.__y==etiqueta #convertimos self.__Y A UN VEC
        theta = theta.reshape(-1, 1)
        m, n = self.__X.shape
        h = self.getSignoide(self.__X.dot(theta))
        param_regul = self.__lamb_param / (2 * m) * numpy.power(self.__Theta, 2).sum()
        j = -1 / m * (y.T.dot(numpy.log(h)) + (1 - y).T.dot(numpy.log(1 - h)))
        return j.sum()  + param_regul

    def get_gradiente(self, theta,etiqueta):
        y=self.__y==etiqueta #convertimos self.__Y A UN VEC
        theta = theta.reshape(-1, 1)
        m, n = self.__X.shape
        h = self.getSignoide(self.__X.dot(theta))
        param_reg = self.__lamb_param / m * self.__Theta
        grad = (1. / m) * self.__X.T.dot(h - y)
        return grad.flatten()  + param_reg.flatten()

    def descenso_gradiente2(self, alpha, itera):
        js = []
        theta = self.__Theta
        for i in range(itera):
            js.append(self.getCrossEntropy(theta))
            theta = theta - alpha * self.get_gradiente(theta)
            self.__Theta = theta
        return numpy.array(js)
    def setLambda(self,Lambda):
        self.__lamb_param = Lambda
    def cargar_Parametros(self,data):
        t=h5py.File(data,"r")
        self.__Theta=t["Theta"][:]
    def GuardarParams(self,data):
        t=h5py.File(data,'w')
        t.create_dataset('Theta',data=self.__Theta)
        t.close()


    def entrenar(self,et):
        Matrix=numpy.ones((et,401))
        for i in range(et):
            Matrix[i,:]=scipy.optimize.fmin_bfgs(self.getCrossEntropy, self.__Theta, fprime=self.get_gradiente,args=(i,))
        self.__Theta=Matrix
    def Reconocer(self,X):
        ans=self.__Theta.dot(X)
        return numpy.argmax(self.getSignoide(ans))
    def cambiar_kernel(self, grado):
        self.__X = self.getphi(self.__X, grado)
        self.__Theta = numpy.ones(self.__X.shape[1])
    

l=Logistica()
l.fit(X,y)
l.InicializarParametros()
l.entrenar(10)
print(l.Reconocer(digito))
#historial=l.descenso_gradiente2(0.01,1000000)
#l.descenso_gradiente(0.01)
#pl.plot(range(historial.size),historial)
#print(l.getParametros())

#l.graficarConjunto(True)


"""
explicacion and
 -30 20 20

explicacion or 
 -30 40 40


"""