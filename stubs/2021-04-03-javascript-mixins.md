---
template: BlogPost
path: /hello-world
date: 2021-03-26T18:00:00.332Z
title: 'Hello, World'
metaDescription: >-
  Come può intitolarsi il primo post di un blog su argomenti legati al mondo
  della programmazione e del machine learning? Beh, ci siamo capiti.
thumbnail: /assets/hello-world.jpg
---

## Mixins and JavaScript: il bello, il brutto e il cattivo

I Mixins e JavaScript sono come i classific film di Client Eastwood.

Il buono è che comporre oggetti a partire da piccoli pezzi di implementazione è possibile grazie alla natura flessibile di JavaScript, e che i mixins sono molto popolari in certi "circoli".

Il cattivo è una lunfa lista: non vi è un'idea comune di quello che il concetto di mixin rappresenta in JavaScript; non vi è un pattern comune per i mixin; richiedono delle librerie esterne per essere utilizzati; delle composizioni più avanzate (come la coordinazione tra i mixins ed i prototypes) è complicata e non nasce facilmente dai pattern; sono difficili da analizzare mediante analisi statica ed introspezione; infine, la maggior parte delle librerie sui mixin mutano gli oggetti o i loro prototipi, causando problemi alle VMs, e alcuini programmatori tendono quindi ad evitarli.

Il brotto è quindi che il risultato di tutto questo è un ecosistema caotico di librerie e mixins, che spesso offrono una costruzione ed una semantica incompatibile tra le iverse librerie. Per quello che si può vedere, nessuna libreria in particolare è abbastanza popolare da esser chiamata almeno "comune". E' più probabile vedre un progetto implementare la propria vunzione per i mixin, che vedere usata una libreria per i mixin.

I mixin JavaScript finora sono quindi poco utilizzati, molto sotto il loro potenziale.

Per qualcuno che ama i mixins, e pensa che dovrebbero essere usati il più possibile, questo è terribile. I mixins risolvono un gran numero di problemi legati al linguaggi che non supportano l'ereditarietàò multipla. 

Fortunatamente, la fine del tunnel si è visto grazie al passaggio dai classici prototipi alle classi. Il loro arrivo ha findalmente dato a JavaScript una sintassi molto semplice da usare per l'ereditarietà. Le classi JavaScript sono più potenti di quanti molti realizzino, e sono una grande base per costruire dei veri mixins.

Vedremo quindi cosa dovrebbero fare i mixins, e come è semplice creare un sistema di mixins estremamente valente in JavaScript che ben si adatta all'uso delle classi.

https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/

## Cosa sono esattamente i Mixins?

Per comprendere ciò che dovrebbe fare un mixin, vediamo cosa è.

!!!quote
  Un mixin è una sottoclasse astratta, ovvero una definizione di sottoclasse che può essere applicata a diverse superclassi per creare una famiglia correlata di classi modificate. (da qui: http://www.bracha.org/oopsla90.pdf)

Questa è la miglior definizione di mixin disponibile, e mostra la differenza tra un mixin ed una normale classe, dando degli indizi su come i mixins possano essere imlementat in JavaScript.

Per approfondire le implicazioni duqesta definizione, aggiungiamo due termini al nostro lessico:

* definizione di mixin: la definizione di una classe che può essere applicata a diverse superclassi
* applicazione dei mixin: l'applicazione di una definizione di mixin ad una specifica superclasse, che produca una nuova sottoclasse

La definizione di mixin è quindi una sorta di *subclass factory*, parametrizzata dalla superclasse, che produce le applicazioni del mixin. Un'applicazione del mixin sta nella gerarchia dell'ereditarietà tera la sottoclasse e la superclasse.

La vera, ed unica, differenza tra un mixin ed una normale sottoclasse è che la seconda ha una superclasse fissa, mentre una definizione di mixin non ha ancora una superclasse. Solo l'applicazione del mixin ha la sua superclasse. Possiamoa nceh vedere alla normale ereditarietà come ad una forma degenere di ereditarietà con mixin, dove la superclasse è conosciuta al momento di definire la classe, e vi è un'unica applicazione della stessa.

## Esempi

Ecco un esempio di mixins in Dart, che ha una sintasse simile a quella usata per JavaScript:

```python
class B extends A with M {}
```

Qui A è la classe base, B la sottoclasse, ed M è un mixin. L'applicazione del mixin è la specifica combinazione di M mixato in A, spesso chiamata A-with-M. La superclasse di A-with-M + A, e la suprclasse di B non +è A, ma A-with-M.

Alcune dichiarazioni di classi e diagrammi potrebbero essere utili a mostrare quello che sta succedendo.

Iniziamo con una semplcie gerarchia di classsi, dove B eredita da A.

```python
class B extends A {}
```

IMMAGINE

Ora aggiungiamo il mixin

```python
class B extends A with M {}
```

SECONDA IMMAGINE

Come possiamo vedere, la mixin application A-with-M è inserita nella gerarchia tra la sottoclasse e la superclasse.

Nell'immagine precedente, usiamo i trattini più lunghi per indicare la mixin declaration (B include M) e quelli più corti per rappresentare la definizione della mixin application

## Mixins multipli

In Dart, è possibile applicare più mixin in ordine da sinistra verso destra, il che risutla in applicazioni mixin multiple aggiute alla gerarchia dell'ereditarietà:

```python
class B extends A with M1, M2 {}

class C extends A with M1, M2 {}
```

IMMAGINE

## Traditiona JavaScript mixins

La capacità di modfiicare liberamente gli oggetti in JavaScript indca che è molto semplice compare funzioni pr ottenre eil riutilizzo di codice senza affidarsi all'ereditarietà.

Esistono diverse librerie e pattern, che in genere lavorano modificano di oggetti in place, propriando le copietà dai mixin objects e sovrascrivendo le proprietà esistenti.

Questo viene spesso implementato mediante una funzione di questo tipo:

```javascript
function mixin(source, target) {
  for (let prop in source) {
    if (source.hasOwnProperty(prop)) {
      target[prop] = source[prop];
    }
  }
}
```

Una versione di questo costrutto è quella che ha fatto da base alla funzione Object.assign.

mixin() viene quindi normalmente chiamato su un prototipo:

```js
mixin(MyMixin, MyClass.prototype)
```

Ed ora MyClass ha tutte le proprietà definite in MyMixin.

## E quindi?

Limitarsi a copiare le proprietà in un oggetto target ha alcuni problemi. Alcuni di questi possono essere evitati con delle funzioni di mixin abbastanza intelligenti, ma gli esempio comuni hanno normalmente questi problemi:

### I prototipi sono modificati in place

Quando si usano delle mixin libraries con prototipi, questi sono direttamente mutati. Questo è un problema se il prototipo è usato altrove dove le proprietà del mixin non sono desiderati. I mixins che aggiungono uno stato possono creare degli oggetti più lenti nelle VM che provano a capire la forma degli oggetti ad allocation time. Va anche contro l'idea che una mixin application devec reare una nuova classe componendone di esistenti.

### super non funziona

Con JavaScript che supporta super, così dovrebbero fare i mixin: i metodi di un mixin dovrebbero esere in grado di delegare ad un metodo sovrascritto nella prototype chain. Dal momento che super è essenzialmente *lexically bound*, questo non funziona quando si copiano le funzioni.

### incorrect precedent

questo non aviiene sempre, ma come spesso mostrato negli esempi,. sovrascrivendo le proprietà, i metodi dei mixin hanno precedenza su quelli nella sottoclasse. Spesso hannosolo èprecedenza sui metodi nella superclasse, permettendo alla superclasse di sovrascrivere i metodi sul mixin

### la composizione è compromessa

I mixin spesso hanno bisongo di delegare ad altri mixins o oggetto sulla prototype chian, ma non c'è un modo naturale di farlo con i mixin tradizionali. Dal momento che le funzioni sono copiate su degli oggetti, le impleentazionipiù semplici sovrascrivono i metodi esistenti. Librerie più sofisticate permettono di recuperare i meotdi esistenti, e chiamano più metodi dello stesso nome, ma la libreria deve inventare le sue regole di composizione: in quale ordine i metodi sono chiamati, quali argometni vengono passati, etc.

I riferimetni alle funzioni sono duplicate tra tutte le applicazioni di un mixin, dove in molti casi potrebbero essere integrate in un prototipo condisviso. Sovracsrivendo le proprietà, la struttura dei proptotpi e alcuna della natura dinamica di JavaScript viene ridotta: non si possono facilmente fare introspezioni sui mixin o rimuovere o riordinare i mixin, prché il mixin è stato espanso direttamente nell'oggetto target.

Se usiamo la prototype chain, tutto questo se ne va con poco lavoro.

## Miglior mixinx mediante l'espressione delle classi

Vedimo quali feature vogliamo abilitare, in modo da giudicare la nostra implementazione:

1. i mixin sono aggiutni alla prototype chain
2. i mixin sono applicati senza modficare gli oggetti esistenti
3. i mixin non fanno magie, e non definiscono nuova semantica rispetto al linguaggio core
4. super.foo property access funziona all'interno dei mixins e delle sottoclassi
5. le chiamate a super() funzionano enl costruttore
6. i mixinx sono in grado di estendere altri mixins
7. instanceof funziona
8- lòe mixins definition non richiedono il supporto di una libreria - possono essere scritte in uno stile universale
