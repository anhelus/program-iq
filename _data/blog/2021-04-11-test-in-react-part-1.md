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

TODO: intro serie

Jest è stato introdotto da Facebook per il test delle applicazioni JavaScript, con un particolare focus sulle applicazioni React. E' uno dei modi più popolari di testare dei componenti React al giorno d'oggi. Dato che Jest ha a disposizione i suoi test runner, si può semplicemente limitarsi a chiamare Jest da riga di comando ed eseguire tutti i nostri test. Tutti i test sono definiti come test suite (ovvero dei blocchi describe) e dei test cases (ovvero dei blocchi it e test).

Il setup di Jest ci permette di aggiungere una configurazione opzionale, introdurre noi stessi una routine di setup, o definire degli script npm custom per eseguire i nostri test Jest. Vedremo quindi come fare tutto questo. Oltre a tutto il setup, Jest ha una API ricca per testare le assertion (ovvero true equal to true). Il tutorial ci mostra come usare queste test assertion per i nostri componenti React e le funzioni JavaScript. Inoltre, vedremo come usare lo Snapshot Test per testare i nostri componenti React.

## Creazione dell'app

TODO con YARN 

## Setup

Prima di implementare il setup di test e scrivere i primi test sui componenti React, abbiamo bisogno di una semplice applicazione React che può essere testata in primo luogo. Iniziamo con il file src/index.js dove possiamo importare ed effettuare il rendering del component App che non è ancora implementato:

```ts
import React from 'react';
import ReactDOM from 'react-dom';
 
import App from './App';
 
ReactDOM.render(<App />, document.getElementById('app'));
```

Il componente `App` presente all'interno del nostro file `src/App.tsx` sarà, come evidente, un componente funzionale React che sfrutterà sia gli Hooks, sia axios come libreria; assicuriamoci di averla già installata.

```ts

import React from 'react';
import axios from 'axios';
 
export const dataReducer = (state, action) => {
  if (action.type === 'SET_ERROR') {
    return { ...state, list: [], error: true };
  }
 
  if (action.type === 'SET_LIST') {
    return { ...state, list: action.list, error: null };
  }
 
  throw new Error();
};
 
const initialData = {
  list: [],
  error: null,
};
 
const App = () => {
  const [counter, setCounter] = React.useState(0);
  const [data, dispatch] = React.useReducer(dataReducer, initialData);
 
  React.useEffect(() => {
    axios
      .get('http://hn.algolia.com/api/v1/search?query=react')
      .then(response => {
        dispatch({ type: 'SET_LIST', list: response.data.hits });
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR' });
      });
  }, []);
 
  return (
    <div>
      <h1>My Counter</h1>
      <Counter counter={counter} />
 
      <button type="button" onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
 
      <button type="button" onClick={() => setCounter(counter - 1)}>
        Decrement
      </button>
 
      <h2>My Async Data</h2>
 
      {data.error && <div className="error">Error</div>}
 
      <ul>
        {data.list.map(item => (
          <li key={item.objectID}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};
 
export const Counter = ({ counter }) => (
  <div>
    <p>{counter}</p>
  </div>
);
 
export default App;
```

Questa applicazione, in pratica, fa due cose:

* per prima cosa, effettua il rendering di un componente, che abbiamo chiamato `Counter`, che visualizza il contatore. Questo contatore è gestito all'interno del componente App; inoltre, può essere aggiornato usando due pulsanti, che servono per incrementare e decrementare il valore del contatore, rispettivamente;
* secondo, il componente App estrae i dati da una API third-party quando ne viene effettuato il rendering per la prima volta. usiamo l'hook useReducer per gestire lo stato dei dati - che è o i dati veri e prorpi, oppure un errore. Se c'è un errore, si effettua il rendering di un messaggio di errore; se ci sono dati, si effettua il rendering dei dati come una lista di oggetti nel nostro componente React.

Notiamoc he abbiamo già esportato i nostri due componenti e la funzione reducer dal file per renderli testabili successivamente nei nostri file di test. In questo modo, ogni componente ed il reducer possono essere testati in maniera isolata - il che ha senso specialmente epr la funzione reducer per testare la transizione di stato da uno ad un altro stato. Questo è quello che chiameremmo un vero unit test: la funzione è testata con un input ed i test verifica un output atteso.

Inoltre, abbiamo una relazione tra i due componenti React, perché sono componenti padre e figlio. Questo è un altro scenario che può essere testato mediante un integrationt est. SE vogliamo testare ogni componente in maniera isolata, dovremmo avere degli unit test. Ma testandoli insieme nel loro contesto, per esempio effettuando il rendering del componente padre con il suo componente figlio, abbiamo un test di integrazione per entrambi i componenti.

Per mandare in esecuzione i nostri test, facciamo il setup di Jest (dovrebbe essere già installato di default).

Se abbiamo usato CRA, siamo già ok, altrimenti dovremo installare e configurare Jest.

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

## Jest Snapshot Testing in React (ALTRO ARTICOLO)

Jest ha introdotto il concetto del cosiddetto Snapshot Test. In pratica, uno Snapshot Test crea uno snapshot - che viene memorizzato in un file separato - dell'output restituito dal componente quando eseguiamo il nostro test.



This snapshot is used for diffing it to the next snapshot when you run your test again. If your rendered component's output has changed, the diff of both snapshots will show it and the Snapshot Test will fail. That's not bad at all, because the Snapshot Test should only inform you when the output of your rendered component has changed. In case a Snapshot Test fails, you can either accept the changes or deny them and fix your component's implementation regarding of its rendered output.

By using Jest for Snapshot Tests, you can keep your tests lightweight, without worrying too much about implementation details of the component. Let's see how these work in React. First, install the react-test-renderer utility library commonly used for Jest to render your actual component in your tests:

npm install --save-dev react-test-renderer
Second, implement your first Snapshot Test with Jest. First, render a component with the new renderer, transform it into JSON, and match the snapshot to the previously stored snapshot:

import React from 'react';
import renderer from 'react-test-renderer';
 
import { Counter } from './App';
 
describe('Counter', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<Counter counter={1} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
Now run your Jest tests in watch mode again: npm run test:watch. Running your tests in watch mode, when having Snapshot Tests in place, gives you the opportunity to run your tests interactively with Jest. For instance, once your watch mode is active, change the div element to a span element in your React component:

export const Counter = ({ counter }) => (
  <span>
    <p>{counter}</p>
  </span>
);
The command line with the tests running in watch mode should show you a failed Snapshot Test:

Counter
    ✕ snapshot renders (21ms)
 
  ● Counter › snapshot renders
 
    expect(received).toMatchSnapshot()
 
    Snapshot name: `Counter snapshot renders 1`
 
    - Snapshot
    + Received
 
    - <div>
    + <span>
        <p>
          1
        </p>
    - </div>
    + </span>
 
Watch Usage: Press w to show more.
The previous snapshot doesn't match the new snapshot of the React component anymore. Furthermore, the command line offers you things to do now (optionally you have to hit w on your keyboard):

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press u to update failing snapshots.
 › Press i to update failing snapshots interactively.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
Pressing a or f will run all or only your failed tests. If you press u, you accept the "failed" test as being valid and the new snapshot of your React component will be stored. If you don't want to accept it as a new snapshot, then fix your test by fixing your component.

export const Counter = ({ counter }) => (
  <div>
    <p>{counter}</p>
  </div>
);
Afterward, the Snapshot Test should turn green again:

 PASS  src/App.spec.js
  Counter
    ✓ snapshot renders (17ms)
 
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 passed, 1 total
Time:        4.311s
Ran all test suites related to changed files.
 
Watch Usage: Press w to show more.
Anyway, try it yourself by changing the component and either accepting the new snapshot or fixing your React component again. Also add another Snapshot Test for your App component:

import React from 'react';
import renderer from 'react-test-renderer';
 
import App, { Counter } from './App';
 
describe('App', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
 
describe('Counter', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<Counter counter={1} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
Most of the time, Snapshot Tests look the same for every React component. You render the component, transform its rendered output to JSON to make it comparable, and match it with the previous snapshot. Having Snapshot Tests in place keeps testing React components more lightweight. Also, Snapshot Tests can be perfectly used to supplement your unit testing and integration tests, because they don't test any implementation logic explicitly.

Note: If you are using Styled Components in React for CSS-in-JS, check out jest-styled-components for testing your CSS style defintions with snapshot tests as well.

Exercises:
Check your generated src/snapshots/App.spec.js.snap file
Understand why this file exists and how this contributes to diffing snapshots against each other
Get used to accepting or denying (fixing your component) snapshots
Create new React Components and test them with Snapshot Tests
Read more about Jest Snapshot Testing
JEST UNIT/INTEGRATION TESTING IN REACT
Jest can be used to test your JavaScript logic as integration or unit tests as well. For instance, your App component fetches data and stores the result as state with a reducer function by using a React Hook. This reducer function is exported as standalone JavaScript function which doesn't know anything about React. Thus, there doesn't need to be any rendering for the React component and we can test this reducer function as plain JavaScript function.

import React from 'react';
import renderer from 'react-test-renderer';
 
import App, { Counter, dataReducer } from './App';
 
const list = ['a', 'b', 'c'];
 
describe('App', () => {
  describe('Reducer', () => {
    it('should set a list', () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, {
        type: 'SET_LIST',
        list,
      });
 
      expect(newState).toEqual({ list, error: null });
    });
  });
 
  ...
});
Write two additional tests to cover other parts of your reducer function and edge cases. These two other parts are called the "not so happy"-path, because they don't assume a successful outcome (e.g. data fetching fails). By writing your tests this way, you cover all conditional paths in your application's logic.

import React from 'react';
import renderer from 'react-test-renderer';
 
import App, { Counter, dataReducer } from './App';
 
const list = ['a', 'b', 'c'];
 
describe('App', () => {
  describe('Reducer', () => {
    it('should set a list', () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, {
        type: 'SET_LIST',
        list,
      });
 
      expect(newState).toEqual({ list, error: null });
    });
 
    it('should reset the error if list is set', () => {
      const state = { list: [], error: true };
      const newState = dataReducer(state, {
        type: 'SET_LIST',
        list,
      });
 
      expect(newState).toEqual({ list, error: null });
    });
 
    it('should set the error', () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, {
        type: 'SET_ERROR',
      });
 
      expect(newState.error).toBeTruthy();
    });
  });
 
  ...
});
Once you run your tests, you should see the following output on the command line. If a test fails, for instance during watch mode, you will be notified immediately.

You should get a similar output:
 
 PASS  src/App.spec.js
  App
    ✓ snapshot renders (18ms)
    Reducer
      ✓ should set a list (7ms)
      ✓ should reset the error if list is set (1ms)
      ✓ should set the error
  Counter
    ✓ snapshot renders (19ms)
 
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   2 passed, 2 total
Time:        2.325s
Ran all test suites.
 
Watch Usage: Press w to show more.
You have seen how Jest can also be used to test plain JavaScript functions. It doesn't need to be used for only React. If you have more complex functions in your applications, don't hesitate to extract them as standalone functions which can be exported to make them testable. Then you are always assured that your complex business logic works, because it has been covered by your Jest assertions.

Exercises:
Explore more Jest Features and how to use them for Snapshot Testing
Jest gives you (almost) everything you need to test your React components. You can run all your tests from the command line, give it additional configuration, and define test suites and test cases in your test files. Snapshot Tests give you a lightweight way to test your React components by just diffing the rendered output to the previous output. Also you have seen how Jest can be used for testing only JavaScript functions, so it's not strictly bound to React testing.

However, testing the DOM of a React component with Jest is more difficult. That's why there exist other third-party libraries such as React Testing Library or Enzyme to make React component unit testing possible for you. Follow the tutorial series for more testing examples in React.

## FINE PARTE 1
