---
template: BlogPost
path: /test-react-parte-1
date: 2021-03-26T18:00:00.332Z
title: 'Test in React - Parte 1: Introduzione a Jest'
metaDescription: >-
  TODO: Come può intitolarsi il primo post di un blog su argomenti legati al mondo
  della programmazione e del machine learning? Beh, ci siamo capiti.
thumbnail: /assets/hello-world.jpg
---

# Test in React: la guida definitiva

Ho scritto questa guida principalmente per un motivo, ovvero quello di stabilire una guida comprensiva per quello che riguarda il test di un'applicazione in React (e, di conseguenza, anche React Native). Questo è legato semplicemente ad un fuatto: per quanto abbia cercato in lungo ed in largo, ifatti, non mi è staot possibile trovare una guida che mi permettesse una valutazione esaustiva di questi argomenti.

Partiremo quindi dal

TODO: intro serie

## Cosa è Jest?

Jest è una libreria sviluppata appositamente per testare le applicazioni JavaScript, con particolare focus su quelle scritte in React. Jest è un *test runner*: ciò significa che, invocandolo da riga di comando, potremo eseguire tutti i nostri test in maniera completamente automatizzata.

I test sono normalmente definiti all'interno di una *suite*, definita dall'istruzione `describe`, all'interno della quale ci sono dei *test cases*, definiti grazie a blocchi `it` e `test`.

Jest offre delle API per testare le singole *assertion*: ciò permette, ad esempio, di testare se `true` è uguale a `true` (indizio: è sempre vero). Un'altra interessante possibilità è quella di usare lo snapshot test allo scopo di testare i componenti React.

## Creazione dell'app

Allo scopo di questi tutorial, creiamo un'applicazione con React; per farlo, possiamo seguire la procedura standard, usando create-react app, oppure farlo da zero con il modo che abbiamo usato per creare il progetto in React. Vedremo come adattare il nostro progetto ad entrambe le situazioni.

## Setup

Prima di scrivere il primo test sui componenti React, dovremo creare un primo componente! Se abbiamo usato CRA, cancelliamo il contenuto del file `src/App.tsx`, e creiamo al suo posto un semplice componente funzionale.

```ts
import React from 'react';
 
const App = () => {
  const [counter, setCounter] = React.useState(0);
 
  return (
    <div>
      <h1>Contatore</h1>
      <Counter counter={counter} />
 
      <button type="button" onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
 
      <button type="button" onClick={() => setCounter(counter - 1)}>
        Decrement
      </button>
    </div>
  );
};

export default App;
```

Creiamo poi un semplice contatore.

```ts
export const Counter = ({ counter }) => (
  <div>
    <p>{counter}</p>
  </div>
);
 
export default App;
```

Questa semplice app effettuato il rendering di un componente, chiamato `Counter`, che visualizza a schermo un contatore il cui valore è gestito come stato all'interno del componente `App`. Il contatore può essere aumentato o diminuito premendo uno dei due pulsanti mostrati a schermo.

Notiamo inoltre che entrambi i componenti risiedono in file separati, e che entrambi sono esportati; in questo modo, possono essere testati in maniera indipendente l'uno dall'altro.

Abbiamo inoltre una *relazione* tra i due componenti, in quanto possiamo considerare il componente App come "padre" del componente Counter; in questo scenario, stiamo parlando evidentemente di *integration test*. Il test separato dei componenti è quindi una serie di unit test, ma il test congiunto di entrambi, ad esempio valutando il posizionamento del componente padre all'interno del compoentne figlio, abbiamo un test di integrazione che li riguarda entrambi.

### Setup di Jest

Dobbiamo adesso fare il setup di Jest per mandare in esecuzione il nostro test. Se abbiamo usato CRA, abbiamo già a disposizione tutto quello che ci serve; nel caso contrario, invece, dovremo installare e configurare Jest.

## installazione e configurazione di Jest

```sh
yarn add -D jest
```

Nel file package.json, creiamo un nuovo script che permetta l'esecuzione di Jest:

```json
{
  // ...
  "scripts": {
    // ...
    "test": "jest"
  }
}
```

Possiamo inoltre aggiungere la configuraizone passando un file di configurazione Jest aggiuntivo al nostro script:

```json
{
  // ...
  "scripts": {
    // ...
    "test": "jest --config ./jest.config.json"
  }
}
```

A questo punto, posisamo definire le configurazioni di Jest in un opportuno file di configurazione.

```json
// jest.config.json
{
  "testRegex": "((\\.|/*.)(test|spec))\\.ts?$"
}
```

Il parametor testRegex è un'espressione regolare che può essere usato per specificare il nome dei file dove risiederanno i nostri test Jest. In questo caso, i file avranno un nome del tipo *.spec.ts o *.test.ts. Questo è il modo che abbiamo per separarli in maniera chiara dagli altri file nella nostra cartella src/. Infine, aggiungiamo un file di test vicino ai file della App in un nuovo src/App.test.tsx file, all'interno delquale metteremo questo codice:

```ts
// App.test.tsx
describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });
});
```

Ora dovremmo essere in grado di chiamare la suite di test da riga di comando.

```sh
yarn test
```

Noteremo che i test saranno verdi (ovvero *validi*) per questo semplice caso di test, però se proviamo a cambiarlo, diciamo inserendo expect(false).toEqual(true), allora saranno di colore rosso, ad indicare che sono faliti.

Prima di proseguire, aggiungiamo un altro script per abilitare la modalità di *osservazione* dei nostri test. Usando questo comando, potremo fare in modo che i nostri test siano eseguiti in background in una riga di comando, mentre l'applicazione viene esguita su un'altra riga di comando. Ogni volta che cambiamo il codice sorgente mentre sviluppiamo la nostra applicazione, i test saranno eseguiti nuovamente grazie a questo script.

```json
{
  ...
  "scripts": {
    "start": "webpack serve --config ./webpack.config.js --mode development",
    "test": "jest --config ./jest.config.json",
    "test:watch": "npm run test -- --watch"
  },
  ...
}
```

Ora possiamo eseguire i nostri test Jest in watch mode. Facendo in questo modo, avremo un tab aperto per i nostri test Jest in watch mode con yarn test:watch, ed un altro terminale aperto per lanciare la nostra applicazione React mediante yarn start. Ogni volta che cambiamo con file sorgente, i nostri test dovranno essere eseguiti nuovamente a causa del watch mode.

