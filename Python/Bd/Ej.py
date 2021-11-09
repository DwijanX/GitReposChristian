from pymongo import MongoClient
from bson.son import SON

dbCon=MongoClient()
myDb=dbCon["Clase"]
col_cli=myDb["alumnos"]
db = MongoClient().MyDB

ans=col_cli.find({})
for x in ans:
    print(x)