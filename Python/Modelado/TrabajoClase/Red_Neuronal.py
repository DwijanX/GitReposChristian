import h5py
import numpy
import scipy.optimize


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
    def inicializar(self,epsilon=0.12):
        self.theta1=numpy.random.rand(self.capa2,(self.capa1+1))*2*epsilon-epsilon
        self.theta2=numpy.random.rand(self.capa3,(self.capa2+1))*2*epsilon-epsilon
    def cargar_parametros(self, archivo):
        param = h5py.File(archivo, 'r')
        self.theta1 = param['Theta1'][:]
        self.theta2 = param['Theta2'][:]
        print(self.theta1.shape)
        print(self.theta2.shape)
    def GuardarParams(self,data):
        t=h5py.File(data,'w')
        t.create_dataset('Theta1',data=self.theta1)
        t.create_dataset('Theta2',data=self.theta2)
        t.close()

    def predecir(self, imagen):
        a1 = numpy.concatenate([numpy.ones((1, 1)), imagen], axis=1)
        a2 = self.sigmoide(a1.dot(self.theta1.T))
        a2 = numpy.concatenate([numpy.ones((a2.shape[0], 1)), a2], axis=1)
        a3 = self.sigmoide(a2.dot(self.theta2.T))
        return a3.argmax()
    def derivadaSigmoide(self,a):
        return self.sigmoide(a)*(1-self.sigmoide(a))
    def getCrossedEntropy(self,t):
        t1=numpy.reshape(t[0:(self.capa1+1)*self.capa2],(self.capa2,self.capa1+1))
        t2=numpy.reshape(t[(self.capa1+1)*self.capa2:],(self.capa3,self.capa2+1))
        m,n=self.X.shape
        a1=numpy.concatenate([numpy.ones((m,1)),self.X],axis=1)
        a2=self.sigmoide(a1.dot(t1.T))
        a2=numpy.concatenate([numpy.ones((m,1)),a2],axis=1)
        h=self.sigmoide(a2.dot(t2.T))
        yVec=numpy.eye(self.capa3)[self.y.reshape(-1)]
        #para reg
        param_reg=self.lambda_/(2*m)*(numpy.sum(numpy.square(t1[:,1:]))+numpy.sum(numpy.square(t2[:,1:])))
        #entropua cruzada
        j=(-1 / m * (yVec.T.dot(numpy.log(h)) + (yVec - 1).T.dot(numpy.log(1 - h)))).sum() + param_reg
        #computo gradiente :Alg Back Propagation
        delta3=h-yVec
        delta2 = delta3.dot(t2)[:, 1:] * self.derivadaSigmoide(a1.dot(t1.T))

        deltaAcum=delta2.T.dot(a1)
        deltaAcum2=delta3.T.dot(a2)

        grad1=1/m*deltaAcum
        grad2=1/m*deltaAcum2


        grad1[:,1:]=grad1[:,1:]*(self.lambda_/m)*t1[:,1:]
        grad2[:,1:]=grad2[:,1:]*(self.lambda_/m)*t2[:,1:]

        grad=numpy.concatenate([grad1.flatten(),grad2.flatten()])
        return j,grad
    def entrenar(self):
        j_grad=lambda p:self.getCrossedEntropy(p)
        theta_Inicial=numpy.concatenate([self.theta1.flatten(),self.theta2.flatten()])
        opciones={'maxiter':100}
        res=scipy.optimize.minimize(j_grad,theta_Inicial,jac=True,method="TNC",options=opciones)
        thetaOptimos=res.x
        self.theta1=thetaOptimos[0:(self.capa1+1)*self.capa2].reshape(self.capa2,self.capa1+1)
        self.theta2=thetaOptimos[(self.capa1+1)*self.capa2:].reshape(self.capa3,self.capa2+1)

        




