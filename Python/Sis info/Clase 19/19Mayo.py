#%%
#Realizado en vs code
import numpy

a=2

print(a)


arreglo1=numpy.array([1,2,3,4,5,6,7,8])

print(arreglo1)

matriz=numpy.array([[1,2,3],[4,5,6]])
print(matriz)

arreglo2=numpy.arange(1,15)
print(arreglo2)

print(type(arreglo1))
print(type(matriz))

#valores del vector
print("valores del vector")

print(arreglo1[4])

print(arreglo1[2:4])

arreglo1[1]=101

print(arreglo1)
#Tamanho vector
print("Tamanho vector")
print(arreglo1.size)

print(matriz.size)


print(len(arreglo1))
print(len(matriz))

#ordenar vector
print("ordenar vector")

arreglo1.sort()
print(arreglo1)

arreglo2=arreglo1[::-1]

print(arreglo2)

#formas
print("formas")
print(arreglo1.shape)
print(matriz.shape)

arreglo1.reshape((4,2))

arreglo1.reshape((2,4))
print(arreglo1)


matriz.reshape((3,2))
print(matriz)

matriz.reshape((1,6))
print(matriz)


#agregar datos
print("agregar datos")


arr=numpy.append(arreglo1,10)
print(arr)

arreglo3=numpy.append(arreglo1,arreglo2)
print(arreglo3)

arreglo1=numpy.insert(arreglo1,7,10)
print(arreglo1)

arreglo1=numpy.insert(arreglo1,7,[10,11,12,13])
print(arreglo1)

#eliminar valores
print("eliminar valores")

numpy.delete(arreglo1,1)

arreglo1=numpy.delete(arreglo1,[7,8,9,10])
print(arreglo1)

#filtros
print("filtros")

print(numpy.where(arreglo1==5))

Query=numpy.where(arreglo1>=5)

arreglo1[Query]



#%%