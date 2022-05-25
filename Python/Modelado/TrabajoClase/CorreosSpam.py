#%%
from turtle import width
from unittest import TextTestResult
import pandas
import nltk
import warnings
#import wordcloud
from nltk.corpus import stopwords
import matplotlib.pyplot as pl
import string
import numpy
from collections import Counter

data=pandas.read_csv('Python\Modelado\Files\spam.csv',encoding='latin-1')
#data=pandas.read_csv('../Files/spam.csv',encoding='latin-1')

#print(data.head())

data=data.drop(['Unnamed: 2','Unnamed: 3','Unnamed: 4'],axis=1)
data=data.rename(columns={'v2':"texto",'v1':'etiqueta'})
print(data['etiqueta'].value_counts())

#nltk.download('punkt')
#warnings.filterwarnings('ignore')

hamWords=''
spamWords=''


#data['etiqueta']
for val in data[data['etiqueta']=='spam'].texto:
    text=val.lower()
    tokens=nltk.word_tokenize(text)
    for word in tokens:
        spamWords=spamWords+word+' '

for val in data[data['etiqueta']=='ham'].texto:
    text=val.lower()
    tokens=nltk.word_tokenize(text)
    for word in tokens:
        hamWords=hamWords+word+' '

#spam_wordCloud=WordCloud(width=500,height=500).generate(spamWords)
#ham_wordCloud=WordCloud(width=500,height=500).generate(hamWords)

#pl.figure(figsize=(10,8),facecolor='w')
#pl.imshow(spam_wordCloud)

#pl.figure(figsize=(10,8),facecolor='w')
#pl.imshow(ham_wordCloud)

data=data.replace(['ham','spam'],[0,1])

#nltk.download('stopwords')

def text_process(text):
    text=text.translate(str.maketrans('','',string.punctuation))
    text = [word for word in text.split() if word not in stopwords.words('english')]
    return " ".join(text)

data['texto']=data['texto'].apply(text_process)

text=pandas.DataFrame(data['texto'])
labels=pandas.DataFrame=pandas.DataFrame(data['texto'])

total_count=Counter()
for i in range(len(text)):
    for word in text.values[i][0].split(" "):
        total_count[word]+=1

#print(len(total_count))
#print(total_count)

vocab=sorted(total_count,key=total_count.get,reverse=True)

word2idx={}
for i,word in enumerate(vocab):
    word2idx[word]=i

def text2vector(text):
    word_vector=numpy.zeros(vocab.size)
    for word in text.split(" "):
        if word2idx.get(word) is None:
            continue
        else:
            word_vector[word2idx.get(word)]+=1
    return numpy.array(word_vector)


word_vectors=numpy.zeros((len(text),len(vocab)),dtype=numpy.int_)
for i,(_,text) in enumerate(text.interow()):
    word_vectors[i]=text2vector(text[0])
