import h5py
from Logistica import Logistica

l = Logistica()
data= h5py.File("pesos.h5", "r")
print(data["Theta"].shape)