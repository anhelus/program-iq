---
template: BlogPost
path: /face-detection-pt1-haar-cascades
date: 2021-05-17
title: 'Il principio: le Haar Cascades'
category: machine-learning
published: false
metaDescription: >-
  Come può intitolarsi il primo post di un blog su argomenti legati al mondo
  della programmazione e del machine learning? Beh, ci siamo capiti.
thumbnail: /assets/computer-vision.jpg
---

<p style="font-size: 12px; font-style: italic">
Foto di <a href="https://unsplash.com/@opticonor?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Conor Luddy</a> - <a href="https://unsplash.com/s/photos/artificial-intelligence?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</p>
  
  

https://www.pyimagesearch.com/2021/04/12/opencv-haar-cascades/

Le Haar cascade, introdotte per la prima volta da Viola e Jones nella loro seminale pubblicazione del 2001, Rapid Object Detection using a Boosted Cascade of Simple Fetaures, sono probabilmente uno degli algoritmi di object detection più popolari di OpenCV.

Ovviamente, molti algoritmi sono più accurati delle Haar cascade, ma sono ancora oggi rilevnait ed utili.

Uno dei benefici principali delle Haar cascades è che sono *estremamente* veloci. Lo svantaggio sta invece nel fatto che sono particolarmente sensibili ai casi falsi positivi, richiedono il tuning dei parametri quando applicati in inferenza/detection e, in generale, non sono accurate come gli algoritmi moderni.

Detto questo, le Haar cascae sono:

1. una importante parte della letteratura della computer vision e dell'image processing
2. ancora usate con OpenCV
3. ancora utili, particolarmente quando si lavora su dispositivi limitati e non si può avere in generale accesso a object detector più efficaci.

## OpenCV Haar Cascades

In questa prima parte, vedremo cosa sono le Haar cascades e come usarle con la libreria OpenCV. Da qui, configureremo l'ambiente di sviluppo, e quindi la struttura del nostro progetto. Una volta rivista la struttura del progetto, applicheremo le Haar cascades in tempo reale con le OpenCV.

### Cosa sono le Haar Cascades?

IMMAGINE

Publbicate per la prima volta da Paul Viola e Michael Jones nel loro paper del 2001, Rapid Object Detection using a Boosted Cascade of Simple Features, questo lavoro è diventato nel tempo uno dei paper più citati nella letteratura della computer vision.

Nel loro paper, Viola e Jones propongono un algoritmo in grado di individuare oggetti nelle immagini, indipendentemente dalla loro posizione e scala nell'immagine. Inoltre, l'algoritmo può essere eseguito in real time, rendendo possibile individuare gli oggetti nei flussi video.

Specificamente, Viola e Jones si focalizzano sull'individuare volti nelle immagini. Il framework può comunque essere usato per addestrare dei detector per oggetti arbitrari, come auto, costruzioni, utensili di cucina o anche banane.

Mentre il frmaeowkr di Viola-Jones ha certamente aperto le porte alla object detection, è ora sorpassato da altri metodi, come l'uso degli Hisotgram of Oriented Gradients (HOG) + Linear SVM e dal deep learning.

Sappiamo che la convoluzione non fa altro che effettuare lo sliding di una piccola matrice lungo limmagine da sinistra a destra e dall'alto verso il basso, calcolando un valore di uscita per ogni pixel centrale del kernel. Questa operazione è anche estremamente utile nel contesto di individuare oggetti in un'immagine.

Nella figura 2, possiamo vedere che stiamo effettuando lo sliding di una finestra a dimensione fissa nell'immagine. Ad ogni step, la finestra si ferma, calcola alcune feature e quindi classifica la regione come *sì, la regione contiene un volto* o no.

Per farlo, abbiamo bisogno di un classificatore che vengta addestrato a riconoscere dei campioni di un volto positivi e negativi:

* i punti dati positivi sono esempi di regioni che contengono un volto
* i punti dati negativi sono esempi di regioni che non contengono una faccia

Dati dei punti positivi e negativi, possiamo addestrare un classificatore a riconoscere quando una data regione di un'immagine contiene un volto.

Per fortuna, OpenCV può effettuare la face detection usando un Haar cascade preclassificato:



questo ci assicura che non dobbiamo fornire campioni positivi e negativi, addestrare il nostro classificatore, o preoccuparci di aggiustare i parametri. Invece, possiamo semplicemente caricare il classificatore preaddestrato ed indiivduare i volti nell'immagine.

Sotto il cofano, però, OpenCV sta facendo qualcosa di interessante. Per ognuna delle fermate lungo il percorso della finestra mobile, sono calcolate cinque feature rettangolari.

Se siamo familiari con le wavelet, possiamo notare che sono simili alla funzione base di Haar ed alle Haar wavelets.

Per otteneere le feature per ognuna di queste cinque aree rettangolari, possiamo semplicemente sottrarre la somma dei pixel nella regione bianca dalla somma dei pixel nella regione nera. è interesante notare che queste feature hanno una vera importanza nel contesto della face detection:

1. le regioni degli occhi tendono ad essere più scure di quelle degli zigomi
2. la regione del naso è più chiara di quella degli occhi

quindi,d ate queste cinque regioni rettangolari e la loro corrispondente differenza di somme, possiamo formare delle feature che possono classificare parte di un volto.

quindi, per un intero dataset di fetaure, possiamo usare l'algoritmo AdaBoost per selezioanri quali corrispondo alle regioni facciali di un'immagine.

ad ogni modo, come possiamo immaginare, usando una sliding window fissa e fare lo sliding su ogni punto dell'immagine, seguita dal calcolo di queste feature Haar-like, ed infine efettuare la classificazione vera e propria, può essere computazionalmente costoso.

Per contrastare questo fatto, Viola e Jones hanno introdotto il concetto di *cascades*, o *stages*. Ad ogni fermata lungo il percorso della sliding window, questa deve pasasre una serie di test dove goni test conseguente è più costoso del precedente. Se uno qualsiasi di questi fallisce, la finestra è automaticamente scartata.

Alcuni benefici delle Haar cascade stanno nel fatto che sono molto veloci nel calcolo delle feature di Haar grazie all'uso di integral images (http://en.wikipedia.org/wiki/Summed_area_table) Queste sono molto efficienti per la feature selection attraverso l'uso dell'algoritmo AdaBoost.

Forse ancora più importante, possono individuare i volti nelle immagini indipendentemente della locazione o scala del volto.

Infine, l'algoritmo di VIola Jones è capace di essere eseguito in real time.

## problemi e limitazioni

Il detector tende ad essere efficace solo in caso di immagini frontali.

le haar cascade sono notriamente soggette a falsi positivi - l'algoritmo di Viola Jones può facilmente riportare un volto in un'immagine dove non è presente alcun volto.

infine, può essere abbastanza noioso  mettere a punto tutti i parametri di detection delle OpenCV. CI sarannod elle volte dove possiamo individuare tutti i volti in un'immagine, mentre altre volte quando regioni di un'immagine saranno falsamente classificate come volti e/o alcuni volti saranno completamente persi.

## con OpenCV

la libreria OpenCV ha una repository di Haar cascades preaddestrate. https://github.com/opencv/opencv/tree/master/data/haarcascades Queste sono spesso usate per:

1. face detection
2. eye detection
3. mouth dtection
4. full/partial body detection

altre haar cascade preaddestrate sono fornite, inclusa una per le targe russe ed altre per individuare il voltod ei gatti.

possiamo caricare una Haar cascade precaricata usando la funzione cv2.CascadeClassifier:

detector = cv2.CascadeClassifier(path)

una volta che la Haar cascade viene caricata in memoria, possiamo fare predizioni usando la funzione detectMultiScale:

results = detector.detectMultiScale(
  gray, scaleFactor=1.05, minNeighbors=5,
  minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE
)

il risultato è una lista di bounding box che contengono le coordinate x ed y di partenza, assieme alla loro ampiezza w ed altezza h.

## configuraizone dell'ambiente di sviluppo

per seguire questa guida dobbiamo installare la libreria OpenCV nel nostro sistema mediante pip:

pip install opencv-contrib-python

### struttura progetto

dobbiamo a questo punto vedre la struttura della cartella del nostro progetto.

applicheremo tre haar cascade ad un flusso video in tempo reale. in particoalre, sueremo:

1. haarcascade_frontalface_default.xml per individuare ovlti
2. haarcascade_eye.xml per individuare gli occhi destro e sinistro sul volto
3. haarcascade_smile.xml per individuare la bocca del volto

lo script opencv_haar_cascades caricherà queste tre haar cascade dal disco e le applicherà ad uno stream video in temrpo reale.

DA IMPLEMENTING OPENCV HAAR CASCADE OBJECT DETECTION
