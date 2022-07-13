per la object detection basata sul deep learning ci sono tre principali object detector

* R-CNN e sue varianti (es. FAST R-CNN, Faster R-CNN)
* Single Shot Detector (SSD)
* YOLO

## R-CNN

Le R-CNN sono uno dei primi approcci alla object detection basati sul deep learning, e sono un esempio di *two-stage detectors*.

la prima pubblicazione è di Girshick et al., del 2013, Rich feature hierarchies for accurate object detection and semantic segmentation. Qui gli autori propongono un algoritmo tipo Selective Search (http://www.huppelen.nl/publications/selectiveSearchDraft.pdf) per proporre delle bounding box che possono contenere degli oggetti.

queste regioni sono quindi passate ad una CNN per scopo di classificazione

il problema con il metodo R-CNN classico è che è estremamente lento; di conseguenza, si è dovuto aspettare il secondo paper degli stessi autori, nel 2015, chiamato Fast R-CNN: questo algoritmo aveva dei miglioramenti notevoli rispetto alle R-CNN originarie, aumentandone l'accuratezza e riducendo il tempo necessarioad effettuare le computazioni. tuttavia, il modello si affidava sempre ad un algortimo esterno per la region proposal.

infine, sempre nel 2015, Girshick pubblicò l'articolo Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks: qui le R-CNN rimossero la Selective Search, affidandosi ad una Region Proposal Network (RPN) completamente convoluzionale e che possa predire le bounding box e la "objectness" di un oggetto, ovvero un punteggio che quantifica quanto probabilmente la regione di un'immagine possa contenere l'immagie. Gli output delle RPN sonoquindi passati al componente R-CNN per la classificazione ed il labeling.

le RCNN sono molto accurate, tuttavia hanno un problema: sono molto lente, solo 5FPS su una GPU.

per aumentare la velocità dei detector basati sul deep learning, sono stati sviluppati gli approcci  one-stage detector, di cui sia SSD sia YOLO fanno parte.

Questi algoritmi trattano la object detection come un problema di regressione, prendendo una data immagine di ingresso ed apprendendo l coordinate delle bounding box e le probabilità delle label corrispondenti.

in generale, i single stage detector sono meno accurati dei due stage detector, ma molto più veloci.

un esempio di single stage detector è YOLO, introdotto nel 2015 da Redmon et al. nell'articolo You Only Look Once: Unified, Real-Time Object Detecton, con 45 FPS su una GPU.

yolo ha quindi avuto diverse evoluzioni, da YOLO9000: Better, Faster, Stronger, fino alle ultime versioni.

Per far questo, gli autori effettuano un training congiunto sia in termini di object detection che di classificazione. In questo modo, gli autori hanno addestrato contemporaneamente YOLO9000 simultaneamente sia su ImageNet (per classificazione) che su COCO (per detection). Il risultato è un modello YOLO, chiamato YOLO9000, che può predire le classi che non hanno dati etichettati associati.

Tuttavia, YOLO9000 non era accurata a sufficienza, per cui si è dovuto aspettare YOLOv3, nel 2018, per vedere miglioramenti significativi.

TODO: leggere YOLO, YOLOv2 e YOLOv3

## yolo e tensorflow

quando usiamo YOLO, abbiamo tre opozioni:

1. usare modelli pre-addestrati. questi modelli sono stati addestrati su un grosso dataset con 80 classi (categorie) per oggetti di tutti i giorni, come bus, persne, sandwich, etc. 
2. implementare il transfer learning mediante un dataset personalizzato: il transfer learning è un metodo per usare un modello addestrato come punto di parentza per addestrar eun modello a risolvere un task correlato (ma differente). Si può creare un dataset personalizzato usando le istruzioni presenti qui https://github.com/AlexeyAB/Yolo_mark
3. addestrare yolo da zero. questa tecnica non è consigliata, in quanto risulta complesso andare a convergenza
