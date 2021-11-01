#paises={'Argentina':45.37,'Bolivia':11.67,'Brasil':212.55,'Chile':19.12,'Peru':32.97}

#for pais in paises:
 #   print(pais)

#Haz un programa que almacene en una variable a la lista obtenida con range(1,4) y, a continuación, la modifique para que cada componente sea igual al cuadrado del componente original. El programa mostrara la lista resultante por pantalla.
#lista=list(range(1,5,1))
#for i in range(4):
#    lista[i]=lista[i]**2
#print(lista)
#Escribir un programa que permita procesar datos de pasajeros de viaje en una lista de tuplas con la siguiente 
#forma: (nombre, dni, destino). Ejemplo: [("Manuel Juarez", 19823451, "Liverpool"), ("Silvana Paredes", 22709128, "Buenos Aires"),
# ("Rosa Ortiz", 15123978, "Montevideo"), ("Luciana Hernandez", 38981374, "Sao Paulo")] 
# Además, en otra lista de tuplas se almacenan los datos de cada ciudad y el país al que pertenecen. Ejemplo: [("Buenos Aires","Argentina"), ("Montevideo","Uruguay"), ("Sao Paulo", "Brasil"), ("Liverpool","Inglaterra"), ("Madrid","España")]
#  Hacer un menú iterativo que permita al usuario realizar las siguientes operaciones:
#-Agregar pasajeros a la lista de viajeros.
#-Agregar ciudades a la lista de ciudades.
#-Dado el DNI de un pasajero, ver a qué ciudad viaja.
#-Dada una ciudad, mostrar la cantidad de pasajeros que viajan a esa ciudad.
#-Dado el DNI de un pasajero, ver a qué país viaja.
#-Dado un país, mostrar cuántos pasajeros viajan a ese país.
#-Salir del programa
def printMenu():
    print("1.-Agregar pasajerosa la lista de viajeros\n")
    print("2.-Agregar ciudades a la lista de ciudades.\n")
    print("3.-Dado el DNI de un pasajero, ver a qué ciudad viaja.\n")
    print("4.-Dada una ciudad, mostrar la cantidad de pasajeros que viajan a esa ciudad.\n")
    print("5.-Dado un país, mostrar cuántos pasajeros viajan a ese país.\n")
    print("6.-Salir.\n")
def AddPassengers(PassengerArray):
    Name=input("Ingrese el nombre del pasajero\n")
    Dni=int(input("Ingrese el DNI del pasajero\n"))
    Destino=input("Ingrese el destino del pasajero\n")
    PassengerArray[Dni]={"nombre":Name,"dni":Dni,"destino":Destino}

def AddCity(CitiesArray):
    City=input("Ingrese la ciudad\n")
    Country=input("Ingrese el pais\n")
    CitiesArray.append((City,Country))
def getCitiesThatAPassengerTravelsWId(id,PassengerArray):
    print(PassengerArray[id]["destino"])
def getPassengersThatTravelsToXCities(city,PassengerArray):

    for i in PassengerArray:
        if(city==PassengerArray[i]["destino"]):
            print(PassengerArray[i]["nombre"])
def getPassengersThatTravelsToXCountry(Country,CountriesArray,PassengerArray):
    for i in CountriesArray:
        if(i[1]==Country):
            print("ciudad:",i[0])
            getPassengersThatTravelsToXCities(i[0],PassengerArray)


PassengerArray={19823451:{"nombre":"Manuel Juarez","dni":19823451,"destino":"Liverpool"},22709128:{"nombre":"Silvana Paredes","dni":22709128,"destino":"Buenos Aires"},15123978:{"nombre":"Rosa Ortiz","dni":15123978,"destino":"Montevideo"},38981374:{"nombre":"Luciana Hernandez","dni":38981374,"destino":"Sao Pans=0aulo"}} 
CountriesArray=[("Buenos Aires","Argentina"), ("Montevideo","Uruguay"), ("Sao Paulo", "Brasil"), ("Liverpool","Inglaterra"), ("Madrid","España")]
ans=0
while(ans!=6):
    printMenu()
    ans=int(input("Ingrese la opcion que desea\n"))
    if(ans==1):
        AddPassengers(PassengerArray)
        print(PassengerArray)
    elif(ans==2):
        AddCity(CountriesArray)
    elif(ans==3):
        getCitiesThatAPassengerTravelsWId(int(input("ingrese el id del pasajero\n")),PassengerArray)
    elif(ans==4):
        getPassengersThatTravelsToXCities(input("ingrese la ciudad que quiere ver\n"),PassengerArray)
    elif(ans==5):
        getPassengersThatTravelsToXCountry(input("ingrese el pais que quiere ver\n"),CountriesArray,PassengerArray)
    input('Presione una tecla para continuar\n')
