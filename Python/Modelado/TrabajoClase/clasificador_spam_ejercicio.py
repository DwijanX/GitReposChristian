#%%
import numpy
import matplotlib.pyplot as pl
# libreria para ciencia de datos, analitica a nuestro conjunto de spams
import pandas
from nltk.corpus import stopwords
import h5py
from sklearn.svm import SVC
#from wordcloud import WordCloud

# carga de los datos
data = pandas.read_csv("Python\Modelado\Files\spam.csv", encoding='latin-1')
#data = pandas.read_csv("../Files/spam.csv", encoding='latin-1')
#data

# eliminar (drop) columnas(axis=1) innecesaria 
data = data.drop(["Unnamed: 2", "Unnamed: 3", "Unnamed: 4"], axis=1)

data = data.rename(columns={"v2":"mensajes", "v1":"etiqueta"})

#data

data['etiqueta'].value_counts()

import nltk
#nltk.download("punkt")
import warnings
warnings.filterwarnings('ignore')

hams_words = ''
spam_words = ''
data[data['etiqueta']== "spam"]

for val in data[data['etiqueta']== "spam"]["mensajes"]:
    text = val.lower()  # convertir a minusculas
    tokens = nltk.word_tokenize(text)
    for words in tokens:
        spam_words = spam_words + words + ' '

for val in data[data['etiqueta']== "ham"].mensajes:
    text = val.lower()  # convertir a minusculas
    tokens = nltk.word_tokenize(text)
    for words in tokens:
        hams_words = hams_words + words + ' '

#spam_wordcloud = WordCloud(width=500, height=300).generate(spam_words)
#ham_wordcloud = WordCloud(width=500, height=300).generate(hams_words)

#pl.figure(figsize=(10, 8), facecolor='w')
#pl.imshow(spam_wordcloud)

#pl.figure(figsize=(10, 8), facecolor='w')
#pl.imshow(ham_wordcloud)

data = data.replace(['ham', 'spam'], [0, 1])
#data

# stopwords
#nltk.download('stopwords')

import string

def text_process(text):
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = [word for word in text.split() if word.lower() not in stopwords.words('english')]
    return " ".join(text)

data['mensajes'] = data["mensajes"].apply(text_process)
data.head()

mensajes = pandas.DataFrame(data["mensajes"])
etiquetas  = pandas.DataFrame(data["etiqueta"])

# crea vectores del texto
from collections import Counter
total_counts = Counter()
for i in range(len(mensajes)):
    for word in mensajes.values[i][0].split(" "):
        total_counts[word] += 1
        
len(total_counts)

vocab = sorted(total_counts, key=total_counts.get, reverse=True)
vocab[:60]

vocab_size = len(vocab)
word2idx = {}
for i, word in enumerate(vocab):
    word2idx[word] = i

def text_to_vector(text):
    word_vector = numpy.zeros(vocab_size)
    for word in text.split(" "):
        if word2idx.get(word) is None:
            continue
        else:
            word_vector[word2idx.get(word)] += 1
    return numpy.array(word_vector)



word_vector = numpy.zeros((len(mensajes), len(vocab)), dtype=numpy.int_ )
for i, (_, mensajes_) in enumerate(mensajes.iterrows()):
    
    word_vector[i] = text_to_vector(mensajes_[0])

word_vector.shape

from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer()
vectors = vectorizer.fit_transform(data['mensajes'])
vectors.shape

features = vectors

from sklearn.tree import *
from sklearn.model_selection import GridSearchCV, train_test_split, StratifiedKFold, cross_val_score
from sklearn.metrics import accuracy_score

X_train, X_test, y_train, y_test = train_test_split(features, data['etiqueta'], test_size=0.15, random_state=111)


#print(X_train.head())
#print(type(X_train))

clasificador = SVC(kernel="rbf", gamma=10,C=1)
clasificador.fit(X_train,y_train)

ans=clasificador.predict(X_test)
print(ans)
print(y_test)

#%%