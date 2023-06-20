---
template: BlogPost
path: /anomaly-detection
date: 2023-01-01
title: 'Hello, World'
category: general
published: true
metaDescription: >-
  Come può intitolarsi il primo post di un blog su argomenti legati al mondo
  del machine learning? In tanti modi in realtà, ma...beh, ho scelto questo.
thumbnail: /assets/hello-world.jpg
---

## Cosa è l'anomaly detection?

Un'anomalia è semplicemnte un campione che devia considerevolmente dal resto dei campioni in un certo dataset. In modo simile, l'anomaly detection è il procedimento che ci aiuta ad identificare gli outlier nei dati, in pratica punti che deviano considerevolmetne dagli altri.

Esempi di anomalie includono:

* picchi e valli notevoli nel mercato azionario legati ad eventi modiali anomali, come la pandemia
* oggetti difettosi in una catena di propduzione
* campioni contaminati in un laboratorio

Nel caso di grossi dataset, possiamo avere dei pattern molto complessi che non possono essere identificati semplicemente guarndando ai dati. Quindi, per implementeare il machine learning in applicazioni reali, lo studio dell'anomaly detection è molto significativo.

## Tipi di anomalie

Nel dominio della data science, ci sono tre diversi modi di classificare le anomalie. Comprenderli può avere un grande impatto su come si gestiscono le anomalie.

* Point or global anomalies: corrispondono ai campioni che differiscono significativamente dal resto dei campioni. Le anomalie globali sono quelle più comuni. Normalmente, sono molto lontane dalla media o mediana di una qualsiasi distribuzione dati.
* Contextual/conditional anomaly: queste hannov alori che differiscono in maniera drammatica da quelli di altri campioni nello stesso contesto. Le anomalie in un datset potrebbero non esserlo in un altro.
* Collective anomalies: gli oggetti outlier che sono strettamente clusterizzati perché hanno lo stesso meccanismo sottostante di outlier sono chiamati collective outliers.

Dal punto di vista del machine learning, individuare delle anomalie è complesso: per definizione, infatti, avremo molti esempi di eventi standard, e pochi esempi di eventi anomali.

Come fanno quindi gli algoritmi di machine learning, che tendono a funzionare al meglio con dataset bilanciati, a lavorare quando le anomalie che vogliamo individuare accadono al più nell'1% dei casi?

## Algoritmi di anomaly detection

Due sottoclassi:

* Outlier detection: in questo caso, il nostro dataset in ingresso ha campionidi entrambi i tipi di evento, ovvero standard ed anomali. Questi algoritmi provano a fittare regioni dei dati di addestramento dove sono più concentrati gli eventi standard, scartando e quindi isolando gli eventi anomali. Questi algoritmi sono spesso addestrati in maneira non superivisionata. Alle volte usiamo quesit metodi per aiutare a pulire e pre-elaborare dei dataset prima di applicare delle tecniche di machine learning tradizionali.

* Novelty detection: a differenza della outlier detection, che include esempi di eventi sia standar disa anomali, gli algoritmid i novelty detection hanno soltanto i campioni standard (ovvero quelli non anomali) durante l'addestramento, che avviene in maniera superviionata. Al momento del test, gli algoritmi di novelty detection devono essere in grado di comprendere quando un punto dati in input è un outlier.

In breve, l'outlier detection è una forma di learning non supervisionato. Qui forniamo l'intero dataset di campioni e chiediamo all'algoritmo di raggrupparli in inlier (campioni standard) ed outlier (anomalie).

Le novelty detection è una forma di apprendimento supervisionato, ma abbiamo le label per i punti dati stnadard - è affidato all'algoritmo di novelty detection per predire se un campione è un inlier o outlier al momento del test.

## Isolation forest

L'isolation forest venne per la prima volta proposta nel paper https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/tkdd11.pdf. In particolare, le isolation forests sono un tipo di algoritmo di ensemble che consiste di più alberi decisionali usati per suddividere il dataset di input in diversi gruppi di inlier.

Così come le random forest, le isolation forest sono costruite usando degli alberi decisionali. Sono implementate in mdoalità non supervisionata, in quanto non ci sono dei label predefiniti. le isolation forest sono state progettate con l'idea che le anomalie sono "pochi e distinti" campioni nel dataset.

Ricordando che gli alberi decisionali sono costruiti usando dei criteri informativi come il Gini index o l'entropia. I gruppi ovviamente differenti sono separati alla radice dell'albero e più in profondità nei branch, mentre le distinzioni più sottili vengono identificate. Sulla base delle caratteristiche selezionate casualmnte, una isolation forest elabora i dati sottocampionati casualmente in una struttura ad albero. I campioni che vanno più in profondità nell'albero e richiedono più tagli per essere separati hanno poca probabilità di essere anomali. Allo stesso modo, i campioni che sono individuati sui rami più corti dell'alebro sono più probabilmente delle anomalie, dal momento che l'albero è stato in grado di distinguerli più facilmente dagli altri.

https://pyimagesearch.com/2020/01/20/intro-to-anomaly-detection-with-opencv-computer-vision-and-scikit-learn/

https://machinelearningmastery.com/anomaly-detection-with-isolation-forest-and-kernel-density-estimation/

## Kernel density estimation

https://machinelearningmastery.com/anomaly-detection-with-isolation-forest-and-kernel-density-estimation/

