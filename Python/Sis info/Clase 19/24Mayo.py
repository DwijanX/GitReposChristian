#%%
import numpy

import pandas as pd
indice=["Juan","Pedro","Pablo","Maria","jose"]
datos=[42,35,45,30,47]
serie=pd.Series(datos,index=indice)
print(serie)
datos_dicc={"Juan":42,"Pedro":35,"Pablo":45,"Maria":30,"jose":47}
serie2=pd.Series(datos_dicc)
print(serie2)
print(serie.dtype)
print(serie.size)
print(serie.index)
print(serie.values)

print(serie["Juan"])
print(serie[["Pedro","Maria"]])
print(serie[0])
print(serie[1:4])
print(serie[[0,2,4]])

##Dataframes
print("Dataframes")
nombre_paises=["China","India","Estados Unidos","Indonesia","Pakistán",
                  "Brasil","Nigeria","Bangladesh","Rusia","Mexico"]
print(nombre_paises)
encabezado=["Poblacion","Porcentaje"]
print(encabezado)

datos=[[1439,18.47],
        [1380,17.70],
        [331,4.25],
        [273,3.51],
        [220,2.83],
        [212,2.73],
        [206,2.64],
        [164,2.11],
        [145,1.87],
        [128,1.65]]
paises=pd.DataFrame(datos)
print(paises)
paises=pd.DataFrame(datos,index=nombre_paises,columns=encabezado)
print(paises)

datos={"China":[1439,18.47],
"India":[1380,17.70],
"Estados Unidos":[331,4.25],
"Indonesia":[273,3.51],
"Pakistán":[220,2.83],
"Brasil":[212,2.73],
"Nigeria":[206,2.64],
"Bangladesh":[164,2.11],
"Rusia":[145,1.87],
"Mexico":[128,1.65]}

paises=pd.DataFrame(datos)
print(paises)
paises=pd.DataFrame(datos,index=encabezado)
print(paises)
paises=paises.T
print(paises)

##Atributos Basicos
print("Atributos Basicos")
print(paises.dtypes)
print(paises.values)
print(paises.index,paises.columns)
print(paises.size)
##AccesoaElementos Dataframe
print("AccesoaElementos Dataframe")
print(paises.Poblacion)
print(paises.Porcentaje)
print(paises["Poblacion"])
print(paises[["Poblacion","Porcentaje"]])
print(paises["Poblacion"][2])

print(paises["Poblacion"][1:5])
print(paises.iloc[0])
print(paises.loc["Rusia"])
##Metodos Basicos,Funciones Estadisticas
print("Metodos Basicos,Funciones Estadisticas")

print(paises.info())
print(paises.head())
print(paises.tail())
print(paises.describe())

print(paises.boxplot())


##Leer desde CSVyExcel


print("Leer desde CSVyExcel")
#Usando Consola
Rios=pd.read_csv("Python\Sis info\Files\Rios.csv")
#Usando Extension
#ventas=pd.read_csv("../Files/Rios.csv")
print(Rios)
Rios=pd.read_csv("Python\Sis info\Files\Rios.csv",index_col=0)
print(Rios)
#ventas=pd.read_excel("ventas_anuales.xlsx")
#print(ventas)
#ventas=pd.read_excel("ventas_anuales.xlsx",skiprows=1)

#print(ventas)
#ventas=pd.read_excel("ventas_anuales.xlsx",index_col=0,skiprows=1)
#print(ventas)



#%%