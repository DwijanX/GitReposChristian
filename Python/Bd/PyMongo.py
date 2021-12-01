#from pymongo import MongoClient
#from bson.objectid import ObjectId

#dbCon=MongoClient()
#myDb=dbCon["Clase"]
#col_cli=myDb["Clientes"]
#cliente={"Nombre":"Carlos","Direccion":"Baptista 237"}
#x=col_cli.insert_one(cliente)
#print(x.inserted_id)
#nuevos_clientes=[{"Nombre":"maria","Direccion":"mariah"},
 #               {"Nombre":"pepe","Direccion":"Bolivar 765"},
#                {"Nombre":"jhon","Direccion":"Junin102"},]
#resultados=col_cli.insert_many(nuevos_clientes)
#print(resultados)

#id_cli=ObjectId("61890a70ca186986de58c048")
#print(id_cli)
#lista_cli=list(col_cli.find({"id":id_cli},{"_id":0,"Nombre":1,"Direccion":1}))
#for x in lista_cli:
#    print(x)

from pymongo import MongoClient

db = MongoClient().MyDB

# Creamos una nueva coleccion
result = db.animales.insert_many([{"x": 1, "tags": ["perro", "gato"]},
                                  {"x": 1, "tags": ["gato"]},
                                  {"x": 1, "tags": ["raton","perro", "gato"]},
                                  {"x": 1, "tags": []}
    ])
# Creamos el pipeline
from bson.son import SON
pipeline = [
    {"$unwind":"$tags"},
    {"$group": {"_id": "$tags", "numero": {"$sum": 1}}},
    {"$sort": SON([("numero", -1), ("_id", -1)])}
    ]

mascotas = list(db.animales.aggregate(pipeline)) 
print(mascotas)