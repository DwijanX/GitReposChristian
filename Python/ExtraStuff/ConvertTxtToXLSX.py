#%%
from os import link
from pathlib import Path
import numpy

import pandas as pd

Data = Path("Python\ExtraStuff\Files\Memoria Fotografia de Perdidas.txt").read_text()
#Data = Path("./Files/Memoria Fotografia de Perdidas.txt").read_text()

def find_nth(string, substring, n):
    if (n == 1):
        return string.find(substring)
    else:
       return string.find(substring, find_nth(string, substring, n - 1) + 1)

#print(Data)
#aux=Data.rstrip().find(":,")  
Keys=[]
i=1
aux=0
LastIndex=0
StartKey=1
Links=[]
Actions=[]
LastKey=""
LastKeyStart=0
for x in range(206):
    aux=find_nth(Data.rstrip(),":,",i)
    if i==1:
        Keys.append(Data[0:aux])
    else:
        aux2=find_nth(Data.rstrip(),")",StartKey-1)+2
        while(Data[aux2]==','):
            StartKey+=1
            aux2=find_nth(Data.rstrip(),") ",StartKey-1)+2

        LastPosLink=0
        SubLinks=[]
        substr=Data[LastKeyStart:aux]
        LinkToAdd="https://"
        while LinkToAdd[0:8]=="https://":
            substr=substr[LastPosLink:aux]
            StartOfLink=substr.find("http")
            EndOfLink=substr.find("png")+3
            SearchForOtherLinks=substr.find('",(')
            SearchForJPG=substr.find("jpg")+3
            
            if SearchForJPG<EndOfLink and SearchForJPG>0:
                EndOfLink=SearchForJPG
            if SearchForOtherLinks<EndOfLink and SearchForOtherLinks>0:
                EndOfLink=SearchForOtherLinks
            
            LinkToAdd=substr[StartOfLink:EndOfLink]
            if (len(SubLinks)==0 or SubLinks[-1]!=LinkToAdd) and LinkToAdd!="":
                SubLinks.append(LinkToAdd)
                Keys.append(LastKey)
            LastPosLink=EndOfLink+2
        Links=Links+SubLinks
    LastKeyStart=Data[0:aux].rfind(")")+1
    LastKey=Data[LastKeyStart:aux]
    i+=1
    StartKey+=1
#print(Keys)
#print(Links)

col1 = "Name"
col2 = "Photo"
data = pd.DataFrame({col1:Keys[0:-1],col2:Links})
data.to_excel('Python\ExtraStuff\Files\Memoria Fotografia Perdidas.xlsx', sheet_name='sheet1', index=False)

"""
Test=Data[0:Data.rstrip().find(":,")]

Link=Data[Data.rstrip().find("http"):Data.rstrip().find("png")+3]
SubStrqty=Data[Data.rstrip().find('(')+1:Data.rstrip().find(")")]     
print(SubStrqty)
"""

# %%
