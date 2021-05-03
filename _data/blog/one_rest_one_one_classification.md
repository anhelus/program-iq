---
template: BlogPost
path: /ovo
date: 2021-05-05
title: 'Hello, World'
metaDescription: >-
  Come può intitolarsi il primo post di un blog su argomenti legati al mondo
  della programmazione e del machine learning? Beh, ci siamo capiti.
thumbnail: /assets/hello-world.jpg
---

non tutti i modelli di classificazione predittiva supportano la classificazione multi-classe.

Algoritmi come il percettrone, la regressione logistica e le support vector machiens sono stati progettati per la classificazione binaria, e non supportano nativamente i task di classificazione con più di due classi.

Un approccio per usare algoritmi di classificazione binaria per problemi multiclasse è suddivideere il dataset in più dataset di classificazione binaria, e fittare un modello binario su ciascuno. Due diversi esempi di questo approccio stanno nelle strategeie One-vs-Rest e One-vs-One.

## Classificatori binari per classificazione multi-classe

La classificazione è un problema di modellazione predittivia che prevede l'assegnazione di una label (classe) ad un esempio.

La classificazione binaria riguarda quei task dove agli esempi è assegnata esattamente una tra due classi, mentre nel multi-task abbiamo l'assegnazione di una classe tra più di due.

Esistono degli algoritmi ceh sono stati specificamente progettati per i problemi di classificazione binaria. Gli esempi includono la regressione logisitca, il percettrone e le SVM. Di conseguenza, non psossono essere usati direttamente con problemi multiclasse.

INvece, dei metodi euristici possono essere usati per suddividere un problema multi-classe in più dataset di classificazione binaria, ed addestrare su ciascuno un modello di classificazione binaria.

Due esempi di questi metodi euristici includono:

* One-vs-Rest (OvR)
* one-vs-One (OvO)

### One-vs-Rest for Multi-Class Classification

One-vs-Rest è un metodo euristico per usare gli algoritmi di classificazione binaria per la classificazione multiclasse.

Prevede la suddivisione del dataset multiclasse in più problemi di classificazione binaria. Un classificatore binario è quindi addestrato su ogni problema di classificazione binaria, e le predizioni vengono fatte usando il mdoello che mostra maggiore configednza.

Ad esempio, dato un problema di classificazione multi-clase, con esempi per ogni classe *rosso*, blu e verde, questo può essere divisio in tre dataset di classificazione binaria come segue:

* problema 1: rosso vs [blue, green]
* problema 2: blu vs [red, green]
* problema 3: verde vs (rosso, blu)

unpossibile svantaggio di questo approccio è che richiede che un modello sia creato per ogni classe; ad esempio, tre classi richiedono tre modelli. Quesot può essere un problema in caso di grossi dataset (milioni di righe), modelli lenti (reti neurali) o molte classi (centinaia di classi).

Questo approccio richiede che ogni modello predica la probabilità di appartenenza ad una classe. Il massimo di questi punteggi è quindi usato per effettaure la predizione.

L'approccio viene normalmente usato per algoritminche predicno "naturalmente" il punteggio di appartennza ad una classe, come il percettrone. Di conseguenza, l'implementazione di questi algoritmi in scikit-learn implementa già la strategia OvR di default quando li si usa per la classificazione multi-classe.


We can demonstrate this with an example on a 3-class classification problem using the LogisticRegression algorithm. The strategy for handling multi-class classification can be set via the “multi_class” argument and can be set to “ovr” for the one-vs-rest strategy.

The complete example of fitting a logistic regression model for multi-class classification using the built-in one-vs-rest strategy is listed below.

# logistic regression for multi-class classification using built-in one-vs-rest
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
# define dataset
X, y = make_classification(n_samples=1000, n_features=10, n_informative=5, n_redundant=5, n_classes=3, random_state=1)
# define model
model = LogisticRegression(multi_class='ovr')
# fit model
model.fit(X, y)
# make predictions
yhat = model.predict(X)
1
2
3
4
5
6
7
8
9
10
11
# logistic regression for multi-class classification using built-in one-vs-rest
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
# define dataset
X, y = make_classification(n_samples=1000, n_features=10, n_informative=5, n_redundant=5, n_classes=3, random_state=1)
# define model
model = LogisticRegression(multi_class='ovr')
# fit model
model.fit(X, y)
# make predictions
yhat = model.predict(X)
The scikit-learn library also provides a separate OneVsRestClassifier class that allows the one-vs-rest strategy to be used with any classifier.

This class can be used to use a binary classifier like Logistic Regression or Perceptron for multi-class classification, or even other classifiers that natively support multi-class classification.

It is very easy to use and requires that a classifier that is to be used for binary classification be provided to the OneVsRestClassifier as an argument.

The example below demonstrates how to use the OneVsRestClassifier class with a LogisticRegression class used as the binary classification model.

# logistic regression for multi-class classification using a one-vs-rest
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsRestClassifier
# define dataset
X, y = make_classification(n_samples=1000, n_features=10, n_informative=5, n_redundant=5, n_classes=3, random_state=1)
# define model
model = LogisticRegression()
# define the ovr strategy
ovr = OneVsRestClassifier(model)
# fit model
ovr.fit(X, y)
# make predictions
yhat = ovr.predict(X)
1
2
3
4
5
6
7
8
9
10
11
12
13
14
# logistic regression for multi-class classification using a one-vs-rest
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsRestClassifier
# define dataset
X, y = make_classification(n_samples=1000, n_features=10, n_informative=5, n_redundant=5, n_classes=3, random_state=1)
# define model
model = LogisticRegression()
# define the ovr strategy
ovr = OneVsRestClassifier(model)
# fit model
ovr.fit(X, y)
# make predictions
yhat = ovr.predict(X)


## Ove-Vs-One for Multi-Class Classification

La One-vs-One (OvO9 è un altro metodo euristico per usare gli algoritmi di  classificazione binaria per la classificazione multi-classe.

Come gli OvR, la OvO suddivide un dataset multiclasse in problemi di classificazione binaria. A differenza della OvR, però, che lo divide in un dataset binario per ogni classe, l'approccio OvO suddivide il dataset in un dataset per ogni classe rispetto ogni altra classe.

AD esempio, consideriamo un problema di classificazione multi-classe con quattro classi, rosso, blu, verde e giallo. Questo può essere idviso in sei dataset di classificazione binaria come segue:

* problema 1: rosso vs. blu
* problema 2: rosso vs verde
* 3 rosso vs giallo
* ...tutte le combinazioni

Il numero di dataset ovviamente aumenta in maniera significativa, e quindi anche il numero di modelli. Ovviaemnte il numero di dataset e di modelli è pari ad (n 
 (n1)) / 2, ovvero 6 per 4 classi.

Ogni modello di classificazione binaria può predire un label di classe ed il modello con più predizioni o voti viene predetto dalla strategia OvO.

> Un'alternativa è introdurre K(K-1)/2 funzioni binarie, una per ogni possibile coppia di classi. Questo è un classificatore one-versus-one. Ogni punto è classificato secondo un voto di maggioranza tra le funzioni binarie.

In modo simile, se i modelli di classificazione bianria predicono una classe numerica, come una probabilità, allora l'argmax della somma dei punteggi (ovvero la classe con il punteggio più alto) è la label di classe.

Classicamente, questo approccio viene suggerito per le SVM e gli algoritmi kernel-based. Questo avviene eprché le performance dei metodi kernel non scalano in proporzione alla dimensione del dataset di training, ed usare sottoinsiemi dei dati di training può "contrastare" questo effetto.

L'implementazione della SVM in scikit-òearn è fornita dalla classe SVC, e supporta il metodo OvO per i problemi di classificazione multi-classe. Questo può essere ottenuto impostando l'argomento "decision_function_shape" ad "ovo".

Vediamo brevemente come usare la SVM per la classificazione multi-classe usando il metodo OvO.


1
2
3
4
5
6
7
8
9
10
11
# SVM for multi-class classification using built-in one-vs-one
from sklearn.datasets import make_classification
from sklearn.svm import SVC
# define dataset
X, y = make_classification(n_samples=1000, n_features=10, n_informative=5, n_redundant=5, n_classes=3, random_state=1)
# define model
model = SVC(decision_function_shape='ovo')
# fit model
model.fit(X, y)
# make predictions
yhat = model.predict(X)

La libreria scikit-learn fornisce anche una classe separata OneVsOneClassifier che permette di usare la strategie OvO con un qualsiasi classificatore.

Questa classe  può essere usata con un classificatore binario come SVM, regressione logistica o percettrone per la classificazione multi classe, o anche altri classificatori che suportano nativamente la classificazione multi-classe. 

E' molto facile da usare e richiede che un classificatore che sia usato per classificazione binaria sia fornito coem argomento alla classe OneVsOneClassifier.

Vediamo come in questo esempio, che usa OneVsOneClassifier con una classe SVC usata come modello di classificazione binaria.



# SVM for multi-class classification using one-vs-one
from sklearn.datasets import make_classification
from sklearn.svm import SVC
from sklearn.multiclass import OneVsOneClassifier
# define dataset
X, y = make_classification(n_samples=1000, n_features=10, n_informative=5, n_redundant=5, n_classes=3, random_state=1)
# define model
model = SVC()
# define ovo strategy
ovo = OneVsOneClassifier(model)
# fit model
ovo.fit(X, y)
# make predictions
yhat = ovo.predict(X)
1
2
3
4
5
6
7
8
9
10
11
12
13
14
# SVM for multi-class classification using one-vs-one
from sklearn.datasets import make_classification
from sklearn.svm import SVC
from sklearn.multiclass import OneVsOneClassifier
# define dataset
X, y = make_classification(n_samples=1000, n_features=10, n_informative=5, n_redundant=5, n_classes=3, random_state=1)
# define model
model = SVC()
# define ovo strategy
ovo = OneVsOneClassifier(model)
# fit model
ovo.fit(X, y)
# make predictions
yhat = ovo.predict(X)