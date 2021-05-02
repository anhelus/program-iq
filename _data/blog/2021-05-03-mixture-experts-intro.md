---
template: BlogPost
path: /mixture-experts-intro
date: 2021-05-03
title: 'Introduzione alle Mixture of Experts'
metaDescription: >-
  Esiste un modo per racchiudere in un algoritmo la conoscenza di
  diversi esperti di dominio? Certo! Scopriamo insieme le Mixture of Experts.
thumbnail: /assets/statistics.jpg
---

*Foto di <a href="https://unsplash.com/@edge2edgemedia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Edge2Edge Media</a> - <a href="https://unsplash.com/s/photos/statistics?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>*

# Exp to level up

Uno dei termini di spesso si sente parlare quanod


Una *mixture of experts* è una tecnica *ensemble* sviluppata nell'ambito delle reti neurali.

Questa tecnica prevede che sia decomposta una task di modellazione prevettiva in diverse sotto task. Su ognuna di queste, viene addestrato un modello espertro, ed alla fine viene sviluppato un *gating model*é che apprende quale "esperto" credere sulla base dell'ingresso da predrie, combianndo le diverse predizioni.

La tecnica può essere genralizzata a modelli di ogni tipo. Di conseguenza, mostra una forte simialrità alla *stacked generalization*, ed apparitene allca classe di metodi di ensemble chiamata *meta-learning*.

## Sbtasks and Experts

alcuni task di modellazione predittiva sono notevolmente complessi, anche se possono essere suddivisi naturalmente in sotto task.

ad esempio, consideriamo una funzione monodimensioale che abbia una fomra complessa come una s in due dimensioni. posiamo provare a trovare un modello che modelli completamente la funzione, ma se sappiamo la fomra della stessa (ad S), possiamo anche dividere il problema in tre parti: la curva superiore, la curva inferiore e la linea che connette le curve.

Questo è un approccio al problem solving di tipo *divide-et-impera*, ed è alla base di molti approcci alla modellazione predittiva, così come del problem solving in generale.

Quesot approccio può anche essere esplorato come la base per los viluppo di un metodo di ensemble learning.

Ad esempio, possiamo dividere lo spazio delle feature in ingresso in sottospazi basati su una conoscenza di dominio del problema. Un modello può quindi essere addestrato su ogni sottospazio del problema, in quanto, a tutti gli effetti, *esperto* per lo specifico sottoproblema. Un modello quindi apprende quale esperto chiamare per predire nuovi esempi nel futuro.

I sottoproblemi possono o meno essere sovrapposti, e gli esperti da sottoproblemi simili o correlati possono essere in grado di contriburie agli esempi che sono tecnicamente al di fuori della loro esperienza.

Questo approccio all'ensemble learning è quello alla base di una tecnica chiamata *mixture of experts*.

## Mixture of Experts

La *Mixture of Experts* (ME), è una tecnica di ensemble learning che implementa l'idea di addestrare degli esperti in specifiche sottotask su problemi di modellazione predittiva.

Ci sono quattro elementi nell'approccio, e sono:

* divisione di un task in sottotask;
* sviluppo di un esperto epr ogni sottotask;
* uso di un gating model per decidere quale esperto usare;
* uso delle predizioni e dell'output del gating model per fare la predizione vera e propria.



## Subtasks

Il primo passo è dividere il problema di modellazione predittiva in sottotask. Questo spesso coinvolge l'uso di conoscenza di dominio. Ad esempio, un'immagine può essere divisa in elementi separati, come background, foreground, oggetti, colori, linee e via dicendo.

Il ME funziona in una maniera di tipo divide-et-impera, dove una task complessa è "spezzata" in diversi sottotask più semplcii, e gli "apprenditori" individuali (esperti) sono addestrati per diverse sottotask.

Per quei problemi dove la divisione dei task in sottotask non è ovvia, un approccio più semplice e generico può essere usato. Ad esempio, si può immaginare un approccio che divida lo spazio delle feature in ingresso in gruppi di colonne o esempi separati nello spazio delle feature in abse a misure di distanza, inlier ed outlier per una distribuzione standard, e molto altro.

Nel ME, un problema chiave è come trovare la divisione naturale del task, e quindi derivare la soluzione complessiva dalle sotto-soluzioni.

## Modelli esperti

Successivamente, viene progettato un "esperto" per ogni sottotask.

L'approccio ME era stato inziialmente sviluppato ed esplorato nel campo delle ANN, per cui tradizioalmente gli esperti stessi sono modelli di reti neurali usati per predire un valroe numerico in caso di regressione, o un label in caso di classificazione.

Gli esperti ricevono lo stesso pattern di input (una riga) ed effettuano una predizione.

## Gating Model

un modello viene usato per interpretare le predizioni fatte da goni esperto ed aituare a dicedire quale esperto seguire per un dato input. Questo è chiamato *gating model*, o *gating network*, dato che è tradizionalmente un modello di rete neurale.

La gating network prende come input il pattern di input che è fornito ai modelli esperti, e manda in output i contributi che ogni espeto dovrebbe avere nel fare una rpedizione per l'input.

i pesi determinati dalla gating network sono assegnati dinamicamente sulla base di un dati input, ed il MoE apprende in maniera efficace quale porzione dello spazio delle feature è appreso da ogni membro dell'ensemble.

La gating network è la chiave all'approccio, ed apprende in manira efficace a scegliere il tipo di sottotask per un dato input e, in cambi, l'esperto da seguire per fare una buona predizione.

Le ME possono anche essere visti come un algoritmo di selezione del classificatore, dove iclassificatori individuali sono addestrati a diventare esperti in una parte dello spazio delle feature.

Quando vengono usati modelli di rete neurale, la gating network e gli esperti vengono addestrati assieme, in modo che la gating network apprenda a fidarsi di ogni esperot per fare la predizione. Questa procedura di addestramento è stata implementata tradizionalmente usando l'expectation maximization (EM). La gating network può avere un layer softmax in outut, che prende il confidence score per ogni esperto.

In generale, la procedura di addestramento prova a raggiungere due obiettivi: per un dato esperto, torvrare la funzione di gating ottimale, per una data funzione di gatin, addestrare gli esperti sulla distribuzione specificata dalla gating function.

## Metodi di pooling

Infine, la ME deve fare una predizione, e questo è ottenuto usando un meccanismo di pooling o di aggregazione. Questo può essere semplice come scegliere l'esperto con l'output o confidenza maggiore fornito dalla gating network.

In alternativa, una predizione a somma pesata può essere fatta combinando esplicitamente le predizioni fatte da ogni esperto e la confidenza stimata dalla gating network.

Il sistema di pooling/combinazione può quindi scegliere un singolo classificatore con il peso più alto, o calcolare una media pesata degli output del classificatore per ogni claasse,  e scegliere la classe che riceve la somma pesata più alta.

## Relazioni con altre tecniche

Il metodo ME oggi è poco popolare, forse perché descritto nel campo delle reti neurali. Comunque, più di 25 anni di avanzamenti ed esplorazioni della tecnica sono stati portati avanti (https://ieeexplore.ieee.org/abstract/document/6215056)

Ancora più imporante è consideraer l'inteno della tecnica ed esplorare come la si può usare per i problemi di predictive modeling.

Ad esempio:

* ci sono modi ovvi o sistematici in cui si può dividere il problema di predictive modeling in sottotask?
* ci sono metodi specializzati che si possono usare su ogni sottotask?
* sviluppiamo un modello che predica la confidenza di ogni modello esperto

## ME ed alberi decisionali

Possiamo vedere una relazione tra una ME ed un albero decisionale (CART, Classification And REgression Tree).

Gli alberi decisionali fanno il fitting usando un approccio divide-et-impera nello spazio delle feature. Ogni suddivisione è scelta come valore costante per una feature in input, ed ogni sotto-albero può essre considerato come un sott-modello.

Le ME sono state per lo più studiate nella community delle reti neurali. In questo senso, i ricercatori considrano generalmete una strategia divide-et-impera, provano ad apprendere una mistura di modelli parametrici congiuntamente ed usando regole di comunazione per ottenere una solzuioen complessiva.

Possiamo prendere un simile approccio a decomposizione ricorsiva per decomporre il task di modellazione predittiva in sottoproblemi quando si progetta la ME. Questo viene genericamente chimato *hierarchical mixture of experts* (HME), ed è una procedura che può essere vista come una variante dei meotdi basati su alberi. La differenza principale è che le divisioni dell'albero non sono delle decisioni di tipo hard, ma piuttosto soft, basate su un approccio probabilistico.

A differenza degli alberi decisionali, la divisione del task in sottotask è spesso esplicita e top-down. Inoltre, a differenza di un albero decisionale, la ME prova a d interrogare tutti i modelli esperti piuttosto che uno solo.

Ci sono delle differenze tra gli HTM e l'implementazione CART degli alberi decsionali. In un HME, un modello lineare (o di regressione logisitca) è addattato ad ogni nodo terminale, invece di una costante come nel CART. La suddivisione può essere multipla, onon solo binaria, e gli split sono funzioni probabilistiche di una combinazione lineare di ingressi, piuttosto che un singolo ingresso come nell'uso standard del CART.

Ad ogni modo, queste differenze possono ispirare delle variazioni all'approccio per un dato modello di predictive modeling.

Ad esempio:

* consideriamo approcci automatici o generali per dividere lo spazio delle feature o il problema in subtask per aituare ad ampliare l'utilizzabilità del meotdo.
* consideriamo l'esplorazione di una combinazione di entrambi i metodi che si fidi del migliroe esperto, così come di metodi che cercano un consesnus pesato tra esperit.

## Mixture of Experts e Stacking

L'applicazione della tecnica non deve essere limitata ai modelli di rete neurale e ad un range di tecniche di machine learning standard può essere usato al suo posto per cercare di ottenere lo stesso obiettivo.

In questo modo, il metodo ME appartiene ad una classe più ampia di metodi di ensemble learning che include anche la stacked generalization, concosciuti come stacking. Come una ME, lo stacking addestra un diverso ensemble di mdoelli di machine learning, e quindi apprende un modello di ordine più elevato per combinare nel miglior modo possibile le predizioni.

Possiamo riferirci a questa classe di metodi di enseble come *modelli di meta-learning*. Questi sono modelli che provano ad apprendere dall'output o come combianre l'output di altri modelli a più basso livello.

Il meta-learning è il processo di *apprendere da chi apprende, ovvero dai classificatori*. Per introdurre un meta classificatore, prima i classificatore base devono essere addestrati (stage uno), e quinid il meta classificatore (stage due).

A differenza di una mistura di esperti, i modelli in stacking sono spesso tutti fittati sulllo stesso dataset di trainign, ovvero non vi è una scomposizione del task in sottotask. E a differenza della mistura di esperti, i modelli a più alto livello che combinano le predizione dai modelli a più basso livello tipicamente non ricevnono il pattern di input fornito ai modelli di più basso livello, ed invece prendono come in gresso le predizioni da ciascun mdoello a più basso livello.

I metodi di meta learning sono adatti per casi in cui certi classificatori riescono a classificare correttamente in maniera consistente, o sbaglaire in maniera consistente, alcune istanze.

Ad ogni modo, non vi è ragione per cui modelli ibridi di stacking e mixture of experts non osssano essere sviluppati per trarre il meglio da ciascun approccio su un dato problema di predictive modeling.

Per esempio:

* consideriamo trattare i modelli a basso livello nello stacking come esperti addestrati su diverse propsettive dei dati di traingin. Forse questo può coinvolgere l'uso di un approccio più "soft" alla decomposizione del problema in sottoproblemi dove diversi metodi di data transformation e feature selection sono usati per ciascun modello.
* consideriamo di fornire il patternd i input al meta modello nello stacking, nello sforzo di rendere la pesatura o contributo di modelli a basso livello contestualizzato nel contesto della predizione.


