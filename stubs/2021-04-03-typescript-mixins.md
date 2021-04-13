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

Una delle sfide maggiori con TypesScript è il limite della necessità di ereditare soltanto da una classe per volta. POssiamo però prevenire questo problmea, specialmente in architetture complesse, usando il concetto di [mixin](https://www.typescriptlang.org/docs/handbook/mixins.html) per migliorare l'ereditarietà multipla.

Vedremo qindi cosa sono i mixin, come si usano in TypeScript, e vedremo alcuni casi d'uso.

Per seguire questo tutotrial, dovrete essere familiari con JavaScript, ed avere un'idea di quello che è TypeScript (nel caso, potete sempre segnalarmelo).

## Cosa sono i mixins?

I mixins sono delle speciali classi che contengono una combinazione di metodi che possono essere usati da altre classi. I mixins promuovono la riutilizzabilità del codice, e ci aiutano ad evitare i limiti associati all'ereditarietà multipla.

Anche se gli attributi ed i parametri di istanziazione sono definiti a tempo di compilazione, i mixin possono *defer* definizione e binding dei metodi fino al runtime.

## Creare mixins con Typescript

Per creare un mixin, sfrutteremo due aspetti di Typescript: interface class extentions e declaration merging.

L'interface class extensions è usata per estendere classi multiple in TypeScript. Invece, il declaration merging si riferisce al processo di TypeScript di unire assieme due o più dichiarazioni con lo stesso nome. Le interfacce possono anche essere unite in classi ed altri costrutti se hanno lo stesso nome.

Ecco un esempio di declaration merging:

```ts
interface Car {
  steering: number;
  tyre: number;
}
interface Car {
  exhaustOutlet: number;
}
// contiene proprietà di entrambe le interfacce Car
const BMW: Car = {
  steering: 1,
  tyre: 4,
  exhaustOutlet: 2
}
```

Ora che comprendiamo queste due feature di TypeScript, siamo pronti a partire. Per prima cosa, dobbiamo creare una classe base alla quale saranno applicati i mixins.

```ts
class Block {
  name = "";
  length = 0;
  breadth = 0;
  height = 0;

  constructor(name: string, length: number, breadth: number, height: number,) {
    this.name = name;
    this.length = length;
    this.breadth = breadth;
    this.height = height;
  }
}
```

A qiuesto punto creiamo le classi che la base class estenderà.

```ts
class Moulder {
  moulding = true;
  done = false;
  mould () {
    this.moulding = false;
    this.done = true;
  }
}

class Stacker {
  stacking = true;
  done = false;
  stack() {
    this.stacking = false;
    this.done = true;
  }
}
```

Creiamo un'interfaccia che unisce le classi attese con lo stesso nome della classe base (Block):

```ts
interface Block extends Moulder, Stacker {}
```

La nuova interfaccia è definita con lo stesso nome della classe Block che abbiamo creato prima. Questo aspetto è importantissimo, perché quest'interfaccia sta estendendo sia la classe Moulder sia la classe Stacker. Questo significa che le interfacce uniranno la definizione dei loro metodi in un unico costrutto (l'interfaccia) ed allo stesso tempo si uniranno alla definizione della classe con lo stesso nome.

A causa del declaration merging, la classe Block sarà unita all'interfaccia Block.

### Creazione di una funzione

Per creare una funzione per unire due o più dichiarazioni di classi, useremo la funzione fornita nell'handbook TypeScript ufficiale:

```ts
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      )
    })
  })
}
```

La funzione precedente itera sulle classi Moulder e Stacker, quindi itera sulla sua lista di proprietà e dfeinirsce queste proprietà nella classe Block. In pratica, stiamo linkando manualmente tutti i metodi e le proprietàù dalle classi Moulder e Stacker nella classe Block.

Per continuare, eseguiamo la funzione precedente come segue:

```ts
applyMixins(Block, [Moulder, Stacker]);
```

### Esempio di TypeScript Mixin

```ts
let cube = new Block("cube", 4, 4, 4);
cube.mould();
cube.stack();
console.log(cube.length, cube.breadth, cube.height, cube.name, cube.moulding, cube.stacking);
```

Qui, abbiamo assegnato cube all'istanza della base class Block. Ora l'istanza di Block può accedere direttamente ai metodi mould e stack dalle classi Moulder e Stacker, rispettivamente.

Anche se ci sono altri modi per creare dei mixins con TypeScript, questo è il pattern maggiormente ottimizzato, perché si affida poco al compilatore e più sulla nostra codebase per assciurarsi che sia il runtime che il type - system siano mantenuti sincroni.

### Casi d'uso comuni per i TypeScript mixins

VEdiamo acluni casi comuni per i typescript mixins che potremmo vedre o vorremmo considerare.

### Gestire l'ìestrensione di più classi

Le classi TypeScript non possono estendere diverse classi allo stesso tempo, a meno che un mixin non sia introdotto nell'interfaccia.

Consideriamo questo snippet:

```ts
class Moulder {
  moulding = true;
  done = false
  mould() {
    this.moulding = false;
    this.done = true;
  }
}
class Stacker {
  stacking = true;
  done = false
  stack() {
    this.stacking = false;
    this.done = true;
  }
}
class Block extends Moulder, Stacker{
 constructor() {
    super()
 }
}
```

In questo esempio, la classe Block prova ad estendere due classi allo stesso tempo; se proviamo ad eseguirla, avremo un errore a runtime.

A questo punto, l'unica soluzione a questo limite è introdurre i mixins TypeScript.

## Conclusioni

I mixins TypeScript tornano utili quando si costruiscono delle applicazioni che probabilmente cresceranno in complessità. Quando si creano delle applicazioni TypeScript con architettura complessa, vorremo estendere più classi allo stesso tempo. Con i mixins possiamo andare oltre le limitazioni associate all'ereditarietà multipla.

## Integrazioni da TypeScript

## Mixins

Assieme alle tradizionali gerarchie OO, un altro modo popolare di costruire le classi da componenti riutilizzabili è quello di costruirle combinando delle classi parziali più semplici. Potremmo essere facmiliari con l'idea dei *mixins* da linguaggi come Scala, ed il pattern ha anche raggiunto una certa popolarità nella comunità JavaScript.

## Come funziona un mixin?

Il pattern si affida all'uso di Generics con ereditarietà di classe per estendere una classe base. Il supporto ai mixin di TypeScript è fatto mediante il pattern class expression.
