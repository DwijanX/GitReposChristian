from cmath import nan
from datetime import date
from textwrap import indent
from tokenize import Number
from matplotlib.pyplot import text
import numpy
import pandas
import math


data=pandas.read_csv('Python\\Sis info\\Files\\artworks.csv')

#print(data["Date"])


def FindNumbersAbove1000(txt,indx):
    emp_str = ""
    Numbers=[]
    for m in txt:
        if m.isdigit():
            emp_str = emp_str + m
        elif emp_str!="":
            num=int(emp_str)
            if num>1500 and num<2022:
                num=abs(num)
                Numbers.append(num)
    if emp_str!="":
        num2=int(emp_str)
        num2=abs(num2)
        if num2>700:
            if num2>2022:
                emp_str=emp_str[-4:]
                num2=int(emp_str)
            Numbers.append(num2)
    #print(Numbers)
    print(len(Numbers))
    print(txt)
    #print(data["Artwork ID"][indx])
    #num=int(str(num)[-4:])
    if len(Numbers)==0:
        return 0
    return Numbers[0]
                

def ProcessDates(column):
    for d in range(len(column)):
        if type(column[d])!=type(str()):
            column[d]=0
        else:
            column[d]=FindNumbersAbove1000(column[d],d)
    return column

data["Date"]=ProcessDates(data["Date"])
data["Acquisition Date"]=ProcessDates(data["Acquisition Date"])

data.to_csv('Python\\Sis info\\Files\\processedArtworks.csv')




"""

for d in range(len(data["Date"])):
    if type(data["Date"][d])==type(str()):
        indexInStr=data["Date"][d].find("c. ")
        if indexInStr!=-1:
            print(data["Date"][d])
            data["Date"][d]=int(data["Date"][d][indexInStr+3:indexInStr+7])
"""