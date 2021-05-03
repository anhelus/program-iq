---
template: BlogPost
path: /altro
date: 2021-03-26T18:00:00.332Z
title: 'Hello, World'
category: finance
metaDescription: >-
  Come può intitolarsi il primo post di un blog su argomenti legati al mondo
  della programmazione e del machine learning? Beh, ci siamo capiti.
thumbnail: /assets/hello-world.jpg
---

https://towardsdatascience.com/pipelines-custom-transformers-in-scikit-learn-the-step-by-step-guide-with-python-code-4a7d9b068156

https://towardsdatascience.com/custom-transformers-and-ml-data-pipelines-with-python-20ea2a7adb65

# ;ML Data Pipelines with Custom Transformers in Python

l'80% del tempo totale speso sulla maggior parte dei progetti di data science viene speso sul cleaning e preprocessing dei dati.  ha quindi senso trovare dei modi per automatizzare per quanto possibile il preprocessing ed il cleaning.

Le pipeline di scikit-learn sono composte di step, ognuno dei quali a qualche tipo di trasformazione, ad eccezione dell'ultimo step che può essere un transformer o uno stimatore come un modello di machine learning. Qunado diciamo tranfroer, indichiamo Normalizer StandardScaler o One Hot Encoder tra gli altri. Ma diciamo che se inveice di usare uno di questi vogliamo scrivere i nostri trasformaer custom non forniti da Scikit-lear che prendono la media pesata di alcune colonne nel nostro dataset con un vettore dei pesi fornito come argomento, creano una nuova colonna con i risultati e cancellano le colonne originarie? oltre a far questo, e pià importante, che accade se vogliamo anche che il trasfoemr integri senza soluzione di ocntinuità la nostrapipeline di Scikit-lEarn ed i suoi altri transfoemr? scikit-Learn ci permette di farlo.

## ereditarietà in Python

per capire come possiamo scrivere i nostri transformer personalizzati in scikit-learn, dobbiamo per prima cosa familiarizzare con il concetto di ereditarietà in Python. Tutti i transformer e stimatori in scikit-learn sono implementati come classi Python, ognuno con i loro attributi e metodi. Per cui ogni volta che si scrino delle istruzioni Python come:

from sklearn.preprocessing import OneHotEncoder 

#Initializing an object of class OneHotEncoder
one_hot_enc = OneHotEncoder( sparse = True )

#Calling methods on our OneHotEncoder object
one_hot_enc.fit( some_data ) #returns nothing
transformed_data = one_hot_enc.transform( som_data ) #returns something

stiamo essenzialmente crendo un'istanza chiamata one_hot_ec della classe OneHotEncoder usandoil suo costruttore di classe e passandogli l'argomento False per il parametro "sparse". La classe OneHot Encoder ha metodi come fit, transfomer e fit_transorm ed altri che possono essere chiamati sulla nostra istanza con il numero approrpioato di argomenti.

Affinché il nostro transformer custom sia compatibile ocn una pipeline scikit-learn, deve essere implementato come una classe con meotdi come fit, transform, fit_transfoerm, get_parames, set_params, per cui scriveremo tutti questio...oppure possiamo semplicemente codificare la trasformazione che vogliamo applicare al nostro strasforemer ed erderiaree tutto il resto.

dove troviamo queste classi base che hanno la maggior parte dei metodi sui quali ossiamo basare le nostre classi transforme? Scikit-Learn ci fornisce due ottime classi base, TransformerMixin e BaseEstimator. Ereditare da TransformeMixin si assicura che tutto quello di cui abbiamo bisogno è scrivere i nostri metodi fit e transforme ed ottenre fit_trasform "gratis": Eredeitando da BaseEstimator ci assicuriamo che otteniamo get_params e set_params. Dal momento che il metodo fit non ha bisogno di far nulla se non restituire l'oggetto stesso, tutto quello di cui abbiamo veramente bisogno dopo aver ereditato da queste classi base è definire il metodo di trasformazione per il nostro transformer customed otterremo un custom transformer completamente funzionale che può essere integrato con una pipeline di scikit-learn,

usiamo il boston.

l'obiettivo è vedere quindi gli step coinvolti nella scrittura dei nostri tarnsformer e pipeline custom per preelaborare i dati e arrivare al punto in cui viene mandato i un algoritmo di machine learning per addestrare il modello o fare delle predizioni. Ci possono essere modi migliori per ingengerizzare le feature per questo particolare problema . l'obiettivo però è familiarizzare con i toll da usare per creare transofmrer se pipeline che ci permetterebbero di ingegnierizzare e pre-elaborare le feature in ogni modo che vogliamo per ogni dataset nella maniera più efficace possibile.

Il dataset contiene un insiseme di variabili categoriche e numericamente indipendenti che dovranno essere pre-elaborate in diversi modi e separatamente. Quesot significa che inizialente dovranno andare attraverso delle pipeline separate per essere pre-elaborate in maiera appropriaota, e quinid saranno combinate. di conseguenza il primo step in entrambe le pipeline sarebbe strarre le colonne appropriate che devono essere selezionate per il preprocessing.

La sintassi per scrivere una classe e far sapere a Python che viene ereditata da una o più cassi è mostrata di seguito.

questo è il codice per il primo transformer custom chiamato FeatureSelector. Il metodo transform epr questo costruittore si limita ad estrarre e restituire il dataset pandas con solo qelle colonne i cui nomi sono stati passaticome argomenti durante la sua inizializzazione.


import numpy as np 
import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import FeatureUnion, Pipeline 

#Custom Transformer that extracts columns passed as argument to its constructor 
class FeatureSelector( BaseEstimator, TransformerMixin ):
    #Class Constructor 
    def __init__( self, feature_names ):
        self._feature_names = feature_names 
    
    #Return self nothing else to do here    
    def fit( self, X, y = None ):
        return self 
    
    #Method that describes what we need this transformer to do
    def transform( self, X, y = None ):
        return X[ self._feature_names ] 


come possiamo vedere, si isnierisce BaaseEsteimator e TransformerMixin tra parentesi mentre si dichiarano le classi per far sapere a Python che la nsotra classe erediterà da queste.


As you can see, we put BaseEstimator and TransformerMixin in parenthesis while declaring the class to let Python know our class is going to inherit from them. Like all the constructors we’re going to write , the fit method only needs to return self. The transform method is what we’re really writing to make the transformer do what we need it to do. In this case it simply means returning a pandas data frame with only the selected columns.
Now that the constructor that will handle the first step in both pipelines has been written, we can write the transformers that will handle other steps in their appropriate pipelines, starting with the pipeline that will handle the categorical features.
Categorical Pipeline
Below is a list of features our custom transformer will deal with and how, in our categorical pipeline.
date : The dates in this column are of the format ‘YYYYMMDDT000000’ and must be cleaned and processed to be used in any meaningful way. The constructor for this transformer will allow us to specify a list of values for the parameter ‘use_dates’ depending on if we want to create a separate column for the year, month and day or some combination of these values or simply disregard the column entirely by passing in an empty list. By not hard coding the specifications for this feature, we give ourselves the ability to try out different combinations of values whenever we want without having to rewrite code.
waterfront : Wether the house is waterfront property or not. Convert to binary — Yes or No
view : How many times the house has been viewed. Most of the values are 0. The rest are very thinly spread between 1 and 4. Convert to Binary — Yes or No
yr_renovated : The year the house was renovated in. Most of the values are 0, presumably for never while the rest are very thinly spread between some years. Convert to Binary — Yes or No
Once all these features are handled by our custom transformer in the aforementioned way, they will be converted to a Numpy array and pushed to the next and final transformer in the categorical pipeline. A simple scikit-learn one hot encoder which returns a dense representation of our pre-processed data. Below is the code for our custom transformer.

Numerical Pipeline
Below is a list of features our custom numerical transformer will deal with and how, in our numerical pipeline.
bedrooms : Number of bedrooms in the house. Pass as it is.
bathrooms : Number of bathrooms in the house. The constructor for this transformer will have a parameter ‘bath_per_bead’ that takes in a Boolean value. If True, then the constructor will create a new column by computing bathrooms/bedrooms to calculate the number of bathrooms per bedroom and drop the original bathroom column. If False, then it will just pass the bathroom column as it is.
sqft_living : Size of the living area of the house in square feet. Pass as it is.
sqft_lot : Total size of the lot in square feet. Pass as it is.
floors : Number of floors in the house. Pass as it is.
condition : Discrete variable describing the condition of the house with values from 1–5. Pass as it is.
grade : Overall grade given to the housing unit, based on King County grading system with values from 1–13. Pass as it is.
sqft_basement : Size of the basement in the house in square feet if any. 0 for houses that don’t have basements. Pass as it is.
yr_built : The year the house was built in. The constructor for this transformer will have another parameter ‘years_old’ that also takes in a Boolean value. If True, then the constructor will create a new column by computing the age of the house in 2019 by the subtracting the year it was built in from 2019 and it will drop the original yr_built column. If False, then it will just pass the yr_built column as it is.
Once all these features are handled by our custom numerical transformer in the numerical pipeline as mentioned above, the data will be converted to a Numpy array and passed to the next step in the numerical pipeline, an Imputer which is another kind of scikit-learn transformer. The Imputer will compute the column-wise median and fill in any Nan values with the appropriate median values. From there the data would be pushed to the final transformer in the numerical pipeline, a simple scikit-learn Standard Scaler. Below is the code for the custom numerical transformer.

Combining the pipelines together
Now that we’ve written our numerical and categorical transformers and defined what our pipelines are going to be, we need a way to combine them, horizontally. We can do that using the FeatureUnion class in scikit-learn. We can create a feature union class object in Python by giving it two or more pipeline objects consisting of transformers. Calling the fit_transform method for the feature union object pushes the data down the pipelines separately and then results are combined and returned. In our case since the first step for both of our pipelines is to extract the appropriate columns for each pipeline, combining them using feature union and fitting the feature union object on the entire dataset means that the appropriate set of columns will be pushed down the appropriate set of pipelines and combined together after they are transformed! Isn’t that awesome?
I didn’t even tell you the best part yet. It will parallelize the computation for us! That’s right, it’ll transform the data in parallel and put it back together! So it will be most likely be faster than any script that deals with this kind of preprocessing linearly where it’s most likely a little more work to parallelize it. We don’t have to worry about doing that manually anymore. Our FeatureUnion object will take care of that as many times as we want. All we have to do is call fit_transform on our full feature union object. Below is the code that creates both pipelines using our custom transformers and others and then combines them together.

Now you might have noticed that I didn’t include any machine learning models in the full pipeline. The reason for that is that I simply can’t. The FeatureUnion object takes in pipeline objects containing only transformers. A machine learning model is an estimator. The workaround for that is I can make another Pipeline object , and pass my full pipeline object as the first step and add a machine learning model as the final step. The full preprocessed dataset which will be the output of the first step will simply be passed down to my model allowing it to function like any other scikit-learn pipeline you might have written! Here’s the code for that.

We simply fit the pipeline on an unprocessed dataset and it automates all of the preprocessing and fitting with the tools we built. The appropriate columns are split , then they’re pushed down the appropriate pipelines where they go through 3 or 4 different transformers each (7 in total!) with arguments we decide on and the the pre-processed data is put back together and pushed down the model for training! Calling predict does the same thing for the unprocessed test data frame and returns the predictions! Here’s a simple diagram I made that shows the flow for our machine learning pipeline.

Simple flow diagram for our pipeline
In addition to fit_transform which we got for free because our transformer classes inherited from the TransformerMixin class, we also have get_params and set_params methods for our transformers without ever writing them because our transformer classes also inherit from class BaseEstimator.
These methods will come in handy because we wrote our transformers in a way that allows us to manipulate how the data will get preprocessed by providing different arguments for parameters such as use_dates, bath_per_bed and years_old. Just using simple product rule, that’s about 108 parameter combinations I can try for my data just for the preprocessing part! Which I can set using set_params without ever re-writing a single line of code. Since this pipeline functions like any other pipeline, I can also use GridSearch to tune the hyper-parameters of whatever model I intend to use with it!
There you have it. Now you know how to write your own fully functional custom transformers and pipelines on your own machine to automate handling any kind of data , the way you want it using a little bit of Python magic and Scikit-Learn. There is obviously room for improvement , such as validating that the data is in the form you expect it to be , coming from the source before it ever gets to the pipeline and giving the transformers the ability to handle and report unexpected errors. However , just using the tools in this article should make your next data science project a little more efficient and allow you to automate and parallelize some tedious computations.
If there is anything that I missed or something was inaccurate or if you have absolutely any feedback , please let me know in the comments. I would greatly appreciate it. Thank you.
Sam T
Software Engineer

Follow
1.99K


19


Sign up for The Variable

https://machinelearningmastery.com/how-to-transform-target-variables-for-regression-with-scikit-learn/

# How to transfomer target variables for regression in Python

Preparare correttamente i dati di training può inidcare la differenza tra risultati straordinari e mediocri, anche con pochi semplici algoritmi lineari.

Effettuare le operazioni di data preparation, come lo scaling è relativamente semplice per le variabili di input, ed è una routine in Python mediante la classe Pipeline di scikit-learn.

Sui problemmi di modellazione predittiva di regressione dove bisogna predire un valore numerico, può anche essere citiico effettuare lo scaling ed effettuare altre trasformazioni dati sulle variabili target. Questo può essere fatto in Python usando la classe TransformedTargetRegressor.

## Importanza dello scaling dei dati

è abbastanza comune avere dei dati dove la scala di valori differisce da variabilie a variabile.

Ad esempio, una variabile può essere in piedi, un'altra in metri, e via dicendo.

Alcuni algoritmi si comportano molto meglio se tutte le variabili sono scalate nello stesso range; ad esempio, scalando tutte le variabili nel range tra 0 ed 1, si effettua la cosiddetta procedura di normalizzazione.

Questo influenza algoritmi che usano una somma pesata dell'input, come i modelli lineari e le reti neurali, così come i modelli che usano le misure di distanza come le support vector machines ed il k-nn.

di conseguenza, è una buona pratica scalare i dati di input, e perfino provare altre trasformazioni sui dati, come normalizzarli (ovvero fittare una probabilità di distribuzione Gaussiana) mediante una power transfomr.

Questo si applica anche alle variabili di output, chiamate variabili target, come valori numerici che sono predetti quando si modellano dei problemi di predictive modeling sotto forma di regressione.

Per i problemi di regressione, è spesso desiderabile scalare o trasformare sia l'input isa le variabili target.

Lo scaling delle variabili è semplice. In scikit-learn, si possono usare gli oggetti di scaling manualmente, o la Pipeline (più conveniente da usare) che ci permetta di concatenare una serie di oggetti di trasformazione dati assieme, prima dell'uso del nostro modello.

La Pipeline permetterà di scalare i dati per noi, ed applicare la trasformazione a nuovi dati, come quando si usa un modello per effettuare la predizione.

Ad esempio:


...
# prepare the model with input scaling
pipeline = Pipeline(steps=[('normalize', MinMaxScaler()), ('model', LinearRegression())])
# fit pipeline
pipeline.fit(train_x, train_y)
# make predictions
yhat = pipeline.predict(test_x)
1
2
3
4
5
6
7
...
# prepare the model with input scaling
pipeline = Pipeline(steps=[('normalize', MinMaxScaler()), ('model', LinearRegression())])
# fit pipeline
pipeline.fit(train_x, train_y)
# make predictions
yhat = pipeline.predict(test_x)

La sfida è: qual è il meccanismo equivalente per scalare le variabili target in scikit-learn?

## Come scalare le variabili target

Ci sono due modi per scalare le variabili obiettivo.

Il primo è gestire manualmente la trasformazione, ed il secondo è quello di usare un modo automatico per farlo.

### 1. Trasformazione manuale della variabile obiettivo

Gestire lo scaling della variabile target amnualmente preede la creazioe ed applicazione dell'oggetto di scaling ai dati manualmente. Sono previsti i seguenti step:

1. creazione dell'oggetto per la trasformazione (ad esempio MinMaxScaler)
2. fit della trasformazione sul dataset di training
3. applicazione della trasformazione ai dataset di train e test
4. inversione della trasfromazione su tutte le predizioni fatte

ad esempio, se vogliamo normalizzare una variabile arget, dovremo prima definire ed addestrare un ogetto MinMaxScaler:


...
# create target scaler object
target_scaler = MinMaxScaler()
target_scaler.fit(train_y)
1
2
3
4
...
# create target scaler object
target_scaler = MinMaxScaler()
target_scaler.fit(train_y)

a questo punto trasformeremo le variabili di training e testing

train_y = target_scaler.transform(train_y)
test_y = target_scaler.transform(test_y)

quindi faremo il fit del nostro modello e lo useremo per fare le predizioni

prima che le predizioni possano essere usate o valutate con una metrica di errore, dovremo invertire la trasformazione.

yhat = model.predict(tet_X)
yhat = target_scaler.inverse_transform(yhat)

## Trasformazione automatica della variabile obiettivo

Un approccio alternativo è quello di gestire in automatico la trasformazione e la trasformazione inversa.

Questo può essere fatto usando l'oggetto TransformedTargetRegressor che effettua il wrapping di un dato modello e di un oggetto per lo scaling.

Prepara la trasformata della variabile target usando gli stess dati di training usti per efettuare il fit del modello, quindi applica la trasformata inversa su ogni nuovo dato fornito quando si chiamata predict(),re stituendo le predizioni nella scala corretta.

Per usare il TransformedTargetRegresso,r, viene definito usando il modello specificato e l'oggetto transfrom da usare sul target. ad esempio:

wrapped_model = TransformedTargetRegressor(regressor=model, transformer=MinMaxScaler())

Successivamente, l'istanza di TransformedTargetRegressor può essere fittata come ogni altro modello chiamando la funzione fit() ed usata per fare predizioni mediante la funzione predict().

wrapped_model.fit(train_X, train_y)
yhat = wrapped_model.predict(test_X)

questo è molto più semplice e ci permette di usare funzioni come cross_val_score() per valutare un modello.

Ora che siamo familiari con il TransformedTargetRegressor, vediamonr un esempio d'uso su un dataset reale.

## Esempio di uso del TransformedTargetRegressor

Vediamo come usare il TransformedTargetRegressor in un caso reale.

Usiamo il problema di regressione di Boston housing che ha 13 input ed un target numerico e richiede di conoscere le relazioni tra le caratteristiche del sobborgo ed i prezzi delle case.

il dataset può essere scaricato da qui:

https://raw.githubusercontent.com/jbrownlee/Datasets/master/housing.csv

scarichiamo il dataset e memorizziamolo sotto forma di file csv (ad esempio, housing.csv)

nel dataset vedremo che ci sono molte variabili di tipo numerico;è possibile sareper il significato di ciascuna delle colonne mediante qui https://raw.githubusercontent.com/jbrownlee/Datasets/master/housing.names

possiamo caricare il dataset come un array NumPy e suddividerlo nelle variabili diinput ed output

2
3
4
5
6
7
8
# load and summarize the dataset
from numpy import loadtxt
# load data
dataset = loadtxt('housing.csv', delimiter=",")
# split into inputs and outputs
X, y = dataset[:, :-1], dataset[:, -1]
# summarize dataset
print(X.shape, y.shape)

eguire l'esempio permette di vedere la forma delle partidi input ed output del dataset, il che mostra 13 variabili di input, una di output, e 506 righe di dati

possiamo ora preparare un esempio usando il TransformedTargetRegressor.

se provassimo ad eseguire un DummyRegressor (https://scikit-learn.org/stable/modules/generated/sklearn.dummy.DummyRegressor.html) otterremmo una predizione con un mean absolute error (MAE) di circa 6.659.

in quesot esempio, useremo un HuberRegressor, e normalizzeremo le variabili di input usando una pipeline:

...
# prepare the model with input scaling
pipeline = Pipeline(steps=[('normalize', MinMaxScaler()), ('model', HuberRegressor())])

a questo punto definiremo un'istanza di TransformedTargetRegressor ed imposteremo il regressore alla pipeline ed il trasnformer ad un'istanza di MinMaxScaler.

...
# prepare the model with target scaling
model = TransformedTargetRegressor(regressor=pipeline, transformer=MinMaxScaler())

possiamo valutare il modello normalizzanod le variabili di input ed output usando una k-fold cross-validation con k pari a 10.

...
# evaluate model
cv = KFold(n_splits=10, shuffle=True, random_state=1)
scores = cross_val_score(model, X, y, scoring='neg_mean_absolute_error', cv=cv, n_jobs=-1)

# example of normalizing input and output variables for regression.
from numpy import mean
from numpy import absolute
from numpy import loadtxt
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
from sklearn.pipeline import Pipeline
from sklearn.linear_model import HuberRegressor
from sklearn.preprocessing import MinMaxScaler
from sklearn.compose import TransformedTargetRegressor
# load data
dataset = loadtxt('housing.csv', delimiter=",")
# split into inputs and outputs
X, y = dataset[:, :-1], dataset[:, -1]
# prepare the model with input scaling
pipeline = Pipeline(steps=[('normalize', MinMaxScaler()), ('model', HuberRegressor())])
# prepare the model with target scaling
model = TransformedTargetRegressor(regressor=pipeline, transformer=MinMaxScaler())
# evaluate model
cv = KFold(n_splits=10, shuffle=True, random_state=1)
scores = cross_val_score(model, X, y, scoring='neg_mean_absolute_error', cv=cv, n_jobs=-1)
# convert scores to positive
scores = absolute(scores)
# summarize the result
s_mean = mean(scores)
print('Mean MAE: %.3f' % (s_mean))
Eseguire l'intero esempio valuta il modello con una normalizzazione dell'input e dell'output.



In questo caso, però, otteniamo un MAE di circa 3.1, molto migliore di un odello precedente.

Non siamo ristreti ad usare degli oggetti di scaling: ad esempio, possiamo esplorare usando altre trasformate dati della variabile target, come la PowerTransformer, che può rendere ogni variabile più simile ad una gaussiana e migliorare le operformance dei modelli lineari.

Di default, la PowerTransform effettua anche essa una standardizzazione di ogni variabile dopo aver effettuato la trasformata.

Il completo esempio è qui.

# example of normalizing input and output variables for regression.
from numpy import mean
from numpy import absolute
from numpy import loadtxt
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
from sklearn.pipeline import Pipeline
from sklearn.linear_model import HuberRegressor
from sklearn.preprocessing import MinMaxScaler
from sklearn.compose import TransformedTargetRegressor
# load data
dataset = loadtxt('housing.csv', delimiter=",")
# split into inputs and outputs
X, y = dataset[:, :-1], dataset[:, -1]
# prepare the model with input scaling
pipeline = Pipeline(steps=[('normalize', MinMaxScaler()), ('model', HuberRegressor())])
# prepare the model with target scaling
model = TransformedTargetRegressor(regressor=pipeline, transformer=MinMaxScaler())
# evaluate model
cv = KFold(n_splits=10, shuffle=True, random_state=1)
scores = cross_val_score(model, X, y, scoring='neg_mean_absolute_error', cv=cv, n_jobs=-1)
# convert scores to positive
scores = absolute(scores)
# summarize the result
s_mean = mean(scores)
print('Mean MAE: %.3f' % (s_mean))

# Using scikit-learn Pipelines and FeatureUnions

Il modulo pipeline di scikit-learn ci permette di concatenare transformers e stimatori insieme in modo che li si possa usare come una singola unità. Questo è molto utile quando occorre saltare attraverso diversi step di estrazioni dati, trasformazione, normalizzazione ed inifine addestrare il nostro modello (o usarlo per generare delle predizioni).

Spesso, all'iizio, si inizia con un codice che è simile a questo:


train = read_file('data/train.tsv')
train_y = extract_targets(train)
train_essays = extract_essays(train)
train_tokens = get_tokens(train_essays)
train_features = extract_feactures(train)
classifier = MultinomialNB()

scores = []
train_idx, cv_idx in KFold():
  classifier.fit(train_features[train_idx], train_y[train_idx])
  scores.append(model.score(train_features[cv_idx], train_y[cv_idx]))

print("Score: {}".format(np.mean(scores)))

Spesso, questo ci porta ad un punteggio abbastanza buono per una prima submission. Per miglirare il rank, però, potremmo provare ad estrarre altre feature dai dati. E poi, potremmo volecri trovare a sperimentare su normalizzazione o scaling, e quindi potremmo voler normalizzare alcune feature e fare lo scaling di altre. E' chiqaro come ci si ritroverà quindi abbastanza presto ad affrontare la realtà dei fatti, ovvero che il codice sarà estremamente complesso, 

usare una pipeline semplifica enormemente il processo. Invece di eseguire manualmente ciascuno di questi step, e quindi ripetere noiosamente tutti sul test set, si ha un'interfaccia dichiarativa dove è semplice vedere l'intero modello. questo esempio estrarei documenti di testo, li tokenizza, conta i token, e quindi efettua una transformazione tf-idf prima di passare le feature risultatnti lungo un classificatore di Bayes:

model = Pipeline([
  ('extract_essays', EssayExractor()),
  ('counts', CountVectorizer()),
  ('tf_idf', TfidfTransformer()),
  ('classifier', MultinomialNB())
])

train = read_file('data/train.tsv')
train_y = extract_targets(train)
scores = []
train_idx, cv_idx in KFold():
  model.fit(train[train_idx], train_y[train_idx])
  scores.append(model.score(train[cv_idx], train_y[cv_idx]))

print("Score: {}".format(np.mean(scores)))

questa pipeline può essere pensata come un semplice flow chart: i dati fluiscono attraverso ciascuno step, fino a che non raggiungono il classificatore.

## FeatureUnions

normalmente, si possono estrarre più feature, e questo significa fare delle elaborazioni parallele che devono essere fatte con i dati prima di mettere insieme i risutlati. Usando una FeatureUnion, si possono modellare questi processi paralleli, che sono spesso delle Pipeline esse stesse:

pipeline = Pipeline([
  ('extract_essays', EssayExractor()),
  ('features', FeatureUnion([
    ('ngram_tf_idf', Pipeline([
      ('counts', CountVectorizer()),
      ('tf_idf', TfidfTransformer())
    ])),
    ('essay_length', LengthTransformer()),
    ('misspellings', MispellingCountTransformer())
  ])),
  ('classifier', MultinomialNB())
])

in questo caso, mandiamo l'output dello step exract_essays negli step ngram_tf_idf, essay_length e misspellings e si concatena il loro output prima di mandarli al classificatore.

spesso, si termina con diversi layer di pipeline e feature unions annidati. ad esempio:

pipeline = Pipeline([
    ('features', FeatureUnion([
        ('continuous', Pipeline([
            ('extract', ColumnExtractor(CONTINUOUS_FIELDS)),
            ('scale', Normalizer())
        ])),
        ('factors', Pipeline([
            ('extract', ColumnExtractor(FACTOR_FIELDS)),
            ('one_hot', OneHotEncoder(n_values=5)),
            ('to_dense', DenseTransformer())
        ])),
        ('weekday', Pipeline([
            ('extract', DayOfWeekTransformer()),
            ('one_hot', OneHotEncoder()),
            ('to_dense', DenseTransformer())
        ])),
        ('hour_of_day', HourOfDayTransformer()),
        ('month', Pipeline([
            ('extract', ColumnExtractor(['datetime'])),
            ('to_month', DateTransformer()),
            ('one_hot', OneHotEncoder()),
            ('to_dense', DenseTransformer())
        ])),
        ('growth', Pipeline([
            ('datetime', ColumnExtractor(['datetime'])),
            ('to_numeric', MatrixConversion(int)),
            ('regression', ModelTransformer(LinearRegression()))
        ]))
    ])),
    ('estimators', FeatureUnion([
        ('knn', ModelTransformer(KNeighborsRegressor(n_neighbors=5))),
        ('gbr', ModelTransformer(GradientBoostingRegressor())),
        ('dtr', ModelTransformer(DecisionTreeRegressor())),
        ('etr', ModelTransformer(ExtraTreesRegressor())),
        ('rfr', ModelTransformer(RandomForestRegressor())),
        ('par', ModelTransformer(PassiveAggressiveRegressor())),
        ('en', ModelTransformer(ElasticNet())),
        ('cluster', ModelTransformer(KMeans(n_clusters=2)))
    ])),
    ('estimator', KNeighborsRegressor())
])

## Custom transofrmers

molti degli step negli esempi precedenti includono dei ransformer che non sono forniti nativamente in scikit-learn. Ad esempio, il COlumnExtractor, DenseTransformer, e ModelTransformer sono dei cusom transfoemr. Un transformer è un oggetto che ha al suo interno l'interfaccia standard di scikit-learn, ovvero i metodi fit, transform e fit-transform. Questo include quinid tutti i transformer integrati (ad esempio, il MinMaxScaler), le Pipelines, le FeatureUnion e, ovviamente, gli oggetti Python che implementano questi metodi. L'ereditarietà da TransofmrerMixin non è strettamente richiesta, ma aiuta a ocmunicare gli intenti della classe, e ci dà il metodo fit_transform "gratis".

Un transfomer può essere pensato quindi come una black box che effettua delle operazioni su una serie di dati in ingresso dando una serie di dati in uscita. Questo rende facile riordinare e remixarli alla bisogna. Ad ogni modo, spesso si usano i dataframew pandas, e se ne si attende uno come input verso un transformer. Ad esempio, il ColumnExtractor è per estrarre le colonne da un DatAFramew.

Alle volte, i transoemr sono molto semplici, come HourOfDayTransfoemr, che estrae la componente oraria da un veottre di oggetti datetime. Questi transfoemr sono stateless: non hanno bisogno di essere fittati, per cui fit è una no-op:

class HourOfDayTransformer(TransformerMixin):

    def transform(self, X, **transform_params):
        hours = DataFrame(X['datetime'].apply(lambda x: x.hour))
        return hours

    def fit(self, X, y=None, **fit_params):
        return self

Invece, alle volte i transfoemr devonoe ssere fittati. Vediamo ad esempio il ModelTransfoemr. Si usa per wrappare un modello scikit-learn e fallo comportare come un trasfomer. Questo è utile quando si vuole usare un qualcosa (come ad esempio un KMeans) per generare feature in ingresso ad un altro modello. Deve quindi essere fittato per trainare il modello che wrappa.

class ModelTransformer(TransformerMixin):

    def __init__(self, model):
        self.model = model

    def fit(self, *args, **kwargs):
        self.model.fit(*args, **kwargs)
        return self

    def transform(self, X, **transform_params):
        return DataFrame(self.model.predict(X))


la pipeline tratta questi oggetti come uno dei transfomer bult-in e li fitta durante la fase di training, trasfoemrando i dati usando ognuno di essi quando effettua la predizione.

## pensieri finali

quando l'investimento iniziale è più alto, progettare in questo modo ci assicura che si possa coninuare ad adattare e miliorare senza mettersi le mani nei capelli. Questo approccio paga soprattutto quando si va nel campo del tuning degli iperparametri.
