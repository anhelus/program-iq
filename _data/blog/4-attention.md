## attention

L'attention è un concetto ampiamente studiato assueme ad arousal, alertness ed engagement.

*Nella sua forma più genrica, l'attention può essere descritta come semplicemente un livello complessivo di alerntess, o l'abilità di engage con ciò che si ha attorno

https://www.frontiersin.org/articles/10.3389/fncom.2020.00029/full

La visual attention è una delle aree più spesso studiate dalle prospettive neuroscientifiche e psicologiche.

Quando un soggetto ha diverse immagini, i movimenti oculari che il soggetto effeattua possono rilevare le parti salienti dell'immagine da cui l'attenzione del soggetto è più attratta. Nelal review dei modelli computazionali per la visual attention, Itti e Koch (https://authors.library.caltech.edu/40408/1/391.pdf) affermano che queste parti saliente dell'immagini sono spesso caratterizzate da attributi visivi, incluso il contrasto in termini di intensità, gli edge orientati, gli angoli e le giunzioni, ed il movimento. Il cervello umano è attento a queste feature visive a diversi stage neuronali.

*I neuroni nei primi stage sono impostati verso dei semplici attributi visivi come il contrasto tra colori, l'orientamento, la direzione e la velocità del moto, o la disparità stereo a diverse scale spaziali. Il tuning dei neuroni diventa sempre più specializato con la progressione da aree visive a basso livello verso aree a più alto livello, in modo che le aree a più alto livello includono neuroni che rispondono soltanto agli angoli o alle giunzioni, a indizi legati al rapporto tra ombre e forme, o viste di oggetti del mondo reale specifici.*

https://authors.library.caltech.edu/40408/1/391.pdf

E' interessante notare come i ricercatori hanno anche osservato che diversi soggetti tendono ad essere attratti dagli stessi indizi visivi salienti.

La ricerca ha anche scoperto diverse forme di interazione tra memoria ed attenzione. Dal momento che i cerverllo umano ha una limitata capacità di memoria, scegliere quale informazione mmorizzare diventa cruciale nel fare l'uso migliore delle risorse limitate. Il cervello umano fa questo affidandosi all'attenzione, in modo che memorizzi in maniera dinamica l'informazione cui il soggetto umano pone maggiore attenzione.

## Attentnion in Machine LEarning

Implementare il meccanismo di attenzione nelle reti neurali non segue necessariamente i meccanismi biologici e psicologici del cervello umano. Invece, è l'abilità di evidenziare dinamicamente e usare le parti *salienti* dell'informazione disponibile - in maniera simile come a quella fatta con il cervello umano - che rende l'attenzione un concetto così attraente nel machine learning.

Pensiamo al sistema attenton-based come composto di tre componenti:

1. un processo che "legge" i dati grezzi (come le parole sorgenti in una frase), e li converte in rappresentazione distribuite, con un vettore delle feature associato con ogni posizione delle parole
2. una lista di vettori delle feature che memorizzano l'output del lettore. QUesto può essere considerato una "mmoria" che contiene un insieme di fatti, che possono essere recuperati successivamente, non necessariamente nello stesso ordine, senza dove visitare tutti i fatti.
3. un processo che "sfrutta" il contenuto della memoria per effettuare in maniera sequenziale un task, ad ogni istante temporale con l'abilità di porre attenzione sui contenuti di un elemento (o alcuni, opportunamente pesati) in memoria

Prendiamo il frameowrk encoder-decoder come esempio dal momento che è all'interno di qeusto framework che il meccanismo di attenzione è stato introdotto per la prima volta.

Se stiamo elaborando un insieme di parole di input, allora questo sarà prima mandato ad un encoder, che manderà in output un vettore per ogni elemento nella sequenza. Questo corrisponde al primo componente del sistema attention-based, come detto rpima.

Un insieme di questi vettori (il secondo componente del sistema attention-based), assieme agli stati nascosti precedenti del decoder, saranno sfruttate dal meccanismo di attenzione per evidenziare dinamicamente quale dell'informazione di input sarà usata per generare l'output.

https://machinelearningmastery.com/what-is-attention/



