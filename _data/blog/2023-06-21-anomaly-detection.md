---
template: BlogPost
path: /anomaly-detection
date: 2023-06-21
title: 'Algoritmi di anomaly detection: le isolation forest'
category: general
published: true
metaDescription: >-
  Introduciamo il problema dell'anomaly detection parlando di uno tra gli 
  algoritmi più semplici ma più efficaci: le isolation forests.
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

### Come funzionano le isolation forest?

Copme detto in precedenza, l'outlier detection mediante IF non è altro che un esemble di alberi decisionali binari. Ed ogni albero in una IF è chiamato Isolation Tree. L'algoritmo inizia l'addetramento dei dati generando le Isolation Tree.

Vediuamo l'algoritmo completo step-by-step:

1. Quando abbiamo un dataset, prendiamo un sottoinsieme casuale dei dati ed assegnamolo ad un albero binario.
2. Iniziamo a suddividere l'albero scegliendo una feature casuale dall'insieme delle $N$ feature. Quindi, la suddivisione è fatta su una soglia casuale (un qualsiasi valore nel range dei valori minimi e massimi della feature scelta).
3. Se il valore di un campione è inferireo della soglia scelta, va nel ramo di sinistra, altrimenti alla destra. E quindi un nodo è suddiviso nei rami sinistro e destro.
4. Il procediimento dallo step 2 viene ripetuto ricorsivamente fino a che ogni campione è completamente isoltao, o fino a che una profondità massima viene raggiunto.
5. I passi precedenti sono ripetuti per costruire degli alberi binari casuali.

Dopo che viene creato un ensemble di isolation tree, l'addestramento è completo. Durante lo scoring, un punto dati viene fornito all'ensemble che abbiamo addestrato in precedenza. Adesso, assegnamo un *anomaly score* ad ognuno dei punti sulla base della profondità dell'albeor richiesto per arrivare a quel punto. Quewsto punteggio è un insieme della profondità ottenuta da ciascuno degli isolation tree. Un punteggio di -1 è assegnato alle anomalie, ed 1 ai punti normali, sulla base del parametro *contamination* (percentuale delle anomalie presenti nei dati) fornito.

#### Limiti

Le isolation forest sono computazionalmente efficienti e si sono dimostrate molto efficaci nell'anomaly detection. Nonostante i vantaggi, ci sono alcuni limiti da considerare.

1. L'anomaly score finale dipende dal parametro di contaminazione fornito durante l'addestramento del modello. Questo implica che dobbiamo avere un'idea della percentuale dei dati anomali prima dell'analisi per migliorare la nostra predizione.
2. Inoltre, il modello sforre di un bias legato al modo in cui sono suddivisi i nodi.

Per meglio capire il secondo caso, vediamo il seguente caso.

TODO IMMAGINE IEEE

Qui, nella score map a destra, possiamo vedere che i punti nel centro hanno l'anomaly score più basso, come possiamo attenderci. tuttavia, possiamov edere quattro regioni retangolari attorno al cerchio con un anomaly score basso anche loro. Per cui quando un nuovo data point va a finire in uno qualsiasi di queste regioni rettangolarri potrebbe non essere contrassegnato come anomalia.

ALTRA IMAMGINE

In modo simile, possiamo vedere nell'immagine precedente che se abbiamo due blob di dati, l'anomaly score map ha due blob ulteriori (in alto a destra ed in basso a sinistrA9 che ) che non esistono nei dati.

Quando un nodo in un iTree è suddiviso basato su un valore di soglia, i dati sono suddivisi in rami a sinistra e destra il che risutla in tagli orizzontali e verticali. E qeusti tragli risultano nel bias sul modello.



NELLA FIGURA precedente vediamo i cut dei rami dopo aver combinato gli output di tutti i rami di una IF. Qui possiamo vedere come le regioni rettangolari con anomaly score più bassi sono state formate nella figura a sinsitra. Inoltre, nella figura a destra vediamo la formazione di due blob aggiuntigi causati da altri tagli di rami.

Per andare oltre questi limiti, un'estensione delle isolation forest chiamata Extended Isolation Forests è stata introdotta https://github.com/sahandha , dove i talgi orizzontali e verticali sono rimpiazzati da tagli con delle inclinazioni casuali.


## Kernel density estimation

https://machinelearningmastery.com/anomaly-detection-with-isolation-forest-and-kernel-density-estimation/

