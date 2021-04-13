https://www.robinwieruch.de/react-testing-library

React Testig Library è stata inizialmente rilasciata come un'alternativa alla libreria Enzyme di Airbnb. Mentre Enzyme dà agli sviluppatori React delle utility per testare le parti interne dei componenti React. La React Testing Library fa un passo indietro e ci chiede "come testare i componenti React per ottenere la confidenza integrale nei nostri componenti". Ciò significa: piuttosto che testare i dettagli implementativi dei componenti, React Testing LIbrary mette gli sviluppatori nei panni di un utente finale di un'applicazione React.

Vediamo tutti i passi necessari per effettuare lo unit test e gli integration test nei nostir componenti React.

## Jest vs. React Testing Library

Spesso si confondono i tool per il testing in React. RTL non è un'alternativa a Jest, perché l'uno ha bisogno dell'altra ed ognuno dei due ha un task chiaro.

Nelle versioni moderne di React, gli sviluppatori non son in grado difare a meno di Jest per il testing, perché è il testing framewokr più popolare per le applicazioni JavaScript. Oltre ad essere un test runner, che può essere eseguito faceondo npm test una volta che abbiamo fatto il setup del nostro package.json con uno script di test, Jest offre le seguenti funzioni per i nostri test:

```js
describe('my function or component', () => {
	test('does the following', () => {

	});
});
```

dove il blocco `describe`è la test suite, il bloccodi test (che può anche essere chiamato it) è il test case. Una test suite può avere più test case, ed un test case non deve necessariamente far parte di una test suite. Quelo che inseriamo nei test case sono chiamate *assertiosn* ovvero gli expect in Jest) che possono avere successo (in verde) o fallire (in rosso). Qui abbiamo due assertion che dovrebbero essere vere:

describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });
 
  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});

Se si mette questa test suite ed il test case con le sue assertion in un file test.js, Jest sarà in grado di ritrovarli in maniera automatica qundo eseguiamo npm test. Quando si esegue il comando di test, il test runner di Jest verifica tutti i file con un suffisso test.js di default. Si può configurare questo pattern ed altre cose in un file di configurazione Jest apposito.

Nel caso si utilizzi create-react-app, Jest (e la React Testing Library) è incluso di default nell'installazione (in caso contrario lo si deve configurare).

Una volta che si eseguono i test mediante il test runner di Jest con npm test (o qualsiasi script che stiamo usando nel nostro package.json) vedremo il seguente output per i due test precedentemente definiti:

 PASS  src/App.test.js
  true is truthy and false is falsy
    ✓ true is truthy (3ms)
    ✓ false is falsy
 
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.999s
Ran all test suites related to changed files.
 
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.

Dopo aver eseguito tutti i test, che dovrebbero essere verdi in questi casi, Jest offre un'interfaccia interattiva dove si possono dare ulteriori istruzioni. Ad ogni modo, spesso è solo un test output che cerchiamo; se cambiamo un file, chesia il sorgente o i test, tJest eseguirà nuovamente tutti i test.

function sum(x, y) {
  return x + y;
}
 
describe('sum', () => {
  test('sums up two values', () => {
    expect(sum(2, 4)).toBe(6);
  }
  
  In un progetto JavaScript );
});

In un vero progetto JavaScript, la funzione che vogliamo testare andrebbe in un altro file mentre i test sono in un file di test che importa la funzione da testare:

import sum from './math.js';
 
describe('sum', () => {
  test('sums up two values', () => {
    expect(sum(2, 4)).toBe(6);
  });
});

Essenzialmente, questo è quello che offre Jest. Non c'è (ancora) nulla che riguardi i componenti React. Jest è un test runner, e ci da la possibilità di eseguire i test con Jest dalla riga di comando. Inoltre, Jest offre funzioni per le test suite, test cases, ed assertions. Ovviamente i framewokr offrono pià di questo (ad esempio, spie, mocks, stubs), ma essezialmente questo è quello che è necessario per capire perché dobbiamo usare Jest.

React Testing Library, in contrasto rispetto a Jest, è uno delle testing library per testare i componenti React. UN'altra popolare è Enzyme come menzionato in precedenza. Vedremo nelle prossime sezioni come usare React Testing Library per testare componenti React.

## Rendering di un coponent

RTL viene installato di default con create-react-app; nel caso di un setup React custom, dovremo installarlo da noi. Vediamo ora come effettuare il rendering di un componente React e testarlo con RTL.

```js
import React from 'react';

 
const title = 'Hello React';
 
function App() {
  return <div>{title}</div>;
}
 
export default App;
```

e testarla in un file src/App.test.js:

```js
import React from 'react';
import { render } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });
});
```

La funzione direndering di RTL prende un qualsiasi JSX per effettuarne il rendering. Successivamente, si dovrebbe aver accesso al componente React sotto test.  Per convincerci che è qui, possiamousare la funzione di debug di RTL:

import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    screen.debug();
  });
});

Dopo aver eseguito i nostri test sulla riga di comando, dovremmo poter vedere l'output HTML del nostro componente. Quando scriviamo un test con un componente con RTL, possiamo per prima cosa effettuarne il rendering, e quindi fare il debug di quello che viene visualizzato dal rendereer RTL nel test. In questo modo, possiamo scrivere i nostri test in maneir apiù efficace.



<body>
  <div>
    <div>
      Hello React
    </div>
  </div>
</body>

La cosa bella di questo approccio è che RTL non si preoccupa del component vero e proprio. Vediamo ad esempio un componente React che usa diverse feature React (useState, event handler e props) e concetti (controlled component):

https://www.robinwieruch.de/react-usestate-hook
https://www.robinwieruch.de/react-event-handler
https://www.robinwieruch.de/react-pass-props-to-component
https://www.robinwieruch.de/react-controlled-components


import React from 'react';
 
function App() {
  const [search, setSearch] = React.useState('');
 
  function handleChange(event) {
    setSearch(event.target.value);
  }
 
  return (
    <div>
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
 
      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
}
 
function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
 
export default App;

Se iniziamo a testare di nuovo il nostro componente, dovremmo vedere questo output dalla funzione di debug:

<body>
  <div>
    <div>
      <div>
        <label
          for="search"
        >
          Search:
        </label>
        <input
          id="search"
          type="text"
          value=""
        />
      </div>
      <p>
        Searches for
        ...
      </p>
    </div>
  </div>
</body>

RTL viene usato per interagire con i nostri componenti React come se fosse un essere umano. Quesllo che un essere umano vede è infatti soltanto HTML renderizzato dai nostri componenti React, ed ecco perché vediamo questa struttura HTML in output piuttosto che due singoli componenti React.

## RTL: scelta degli elementi

Dopo aver fatto il rendering dei nostri componenti React, RTL offre diverse funzionidi ricerca per catturare gli elementi. Questi sno quindi usati per le assertion o per le interazioni con l'utente. Ma prima di poer fare queste cose, vediamo come prendere questi ekementi:

import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    screen.getByText('Search:');
  });
});

Ricordiamoci di usare sempre la funzione di debug di RTL se non sappiamo qual è l'output renderizzato della funzione di rendering di RTL. Dopo che veniamo a conoscenza della struttura HTML, possiamo iniziare a selezionare gli elementi con la funzione screen di RTL. L'elemento selezionato può quindi essere usato per le interazioni o asserzioni dell'utente. Faremo quindi una assertion che controlla se l'elemento è o meno nel DOM:

import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    expect(screen.getByText('Search:')).toBeInTheDocument();
  });
});

In modo conveniente, getByText lancia un eccezione di default se l'elemento non può essere trovato. Questo è utile per darci un indizio mentre si scrivono i test che l'elemento selezionato non è qui, inanzitutto. Alcuni sfruttano questo comportamento per usare delle funzioni di ricerca come getByText come rimpiazzo per assertion implicte invece di una assertion espicita con expect:

import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    // implicit assertion
    // because getByText would throw error
    // if element wouldn't be there
    screen.getByText('Search:');
 
    // explicit assertion
    // recommended
    expect(screen.getByText('Search:')).toBeInTheDocument();
  });
});

La funzione getByText accetta una stringa i ingresso, come stiamo facendo adesso, ma anche una normale espressione. Laddove una stringa è uata per il matche satto, un'espressione regolare può essere usata per un amtch parziale, che è spesso più conveniente.

import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    // fails
    expect(screen.getByText('Search')).toBeInTheDocument();
 
    // succeeds
    expect(screen.getByText('Search:')).toBeInTheDocument();
 
    // succeeds
    expect(screen.getByText(/Search/)).toBeInTheDocument();
  });
});

La funzione getByText è solo una tra i molti tipi di funzionidi ricerca disponibili in RTL. Vediamo cosìaltrorisulta essere dispibile.

## RTL: Search Types

Abbiamo visto getBytText, dove Text è uno tra i diversi tipi di ricerca. Mentre Text è spesso il modo più comune per selezionare gli elementi con la React Testing Library, un altro elemento importante è Role con getByRole.

REACT TESTING LIBRARY: SEARCH TYPES
You have learned about getByText where Text is one of several search types. While Text is often the common way to select elements with React Testing Library, another strong is Role with getByRole.

The getByRole function is usually used to retrieve elements by aria-label attributes. However, there are also implicit roles on HTML elements -- like button for a button element. Thus you can select elements not only by visible text, but also by their accessibility role with React Testing Library. A neat feature of getByRole is that it suggests roles if you provide a role that's not available. Both, getByText and getByRole are RTL's most widely used search functions.

The neat thing about getByRole: it shows all the selectable roles if you provide a role that isn't available in the rendered component's HTML:

import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    screen.getByRole('');
  });
});
This means that the previous test outputs the following to the command line after running it:

Unable to find an accessible element with the role ""
 
Here are the accessible roles:
 
document:
 
Name "":
<body />
 
--------------------------------------------------
textbox:
 
Name "Search:":
<input
  id="search"
  type="text"
  value=""
/>
 
--------------------------------------------------
Because of the implicit roles of our HTML elements, we have at least a text box (here <input />) element that we can retrieve with this search type:

import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
So quite often it isn't necessary to assign aria roles to HTML elements explicitly for the sake of testing, because the DOM already has implicit roles attached to HTML elements. This is what makes getByRole a strong contender to the getByText search function from React Testing Library.

There are other search types which are more element specific:

LabelText: getByLabelText: <label for="search" />
PlaceholderText: getByPlaceholderText: <input placeholder="Search" />
AltText: getByAltText: <img alt="profile" />
DisplayValue: getByDisplayValue: <input value="JavaScript" />
And there is the last resort search type TestId with getByTestId where one needs to assign data-testid attributes in the source code's HTML. After all, getByText and getByRole should be your go-to search types to select elements from your rendered React components with React Testing Library.

getByText
getByRole
getByLabelText
getByPlaceholderText
getByAltText
getByDisplayValue
Again, these were all the different search types available in RTL.

REACT TESTING LIBRARY: SEARCH VARIANTS
In contrast to search types, there exist search variants as well. One of the search variants in React Testing Library is getBy which is used for getByText or getByRole. This is also the search variant which is used by default when testing React components.

Two other search variants are queryBy and findBy; which both can get extended by the same search types that getBy has access to. For example, queryBy with all its search types:

queryByText
queryByRole
queryByLabelText
queryByPlaceholderText
queryByAltText
queryByDisplayValue
And findBy with all its search types:

findByText
findByRole
findByLabelText
findByPlaceholderText
findByAltText
findByDisplayValue
What's the difference between getBy vs queryBy?
The big question in the room: When to use getBy and when to use the other two variants queryBy and findBy. You already know that getBy returns an element or an error. It's a convenient side-effect of getBy that it returns an error, because it makes sure that we as developers notice early that there is something wrong in our test. However, this makes it difficult to check for elements which shouldn't be there:

import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    screen.debug();
 
    // fails
    expect(screen.getByText(/Searches for JavaScript/)).toBeNull();
  });
});
This doesn't work, because, even though debug output shows that the element with the text "Searches for JavaScript" isn't there, getBy throws an error before we can make the assertion, because it cannot find the element with this text. In order to assert elements which aren't there, we can exchange getBy with queryBy:

import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
  });
});
So every time you are asserting that an element isn't there, use queryBy. Otherwise default to getBy. So what about findBy then?

When to use findBy?
The findBy search variant is used for asynchronous elements which will be there eventually. For a suitable scenario, let's extend our React components with the following feature (which is independent from the search input field): After its initial render, the App component fetches a user from a simulated API. The API returns a JavaScript promise which immediately resolves with a user object, and the component stores the user from the promise in the component's state. The component updates and re-renders; and afterward the conditional rendering should render "Signed in as" after the component update:

function getUser() {
  return Promise.resolve({ id: '1', name: 'Robin' });
}
 
function App() {
  const [search, setSearch] = React.useState('');
  const [user, setUser] = React.useState(null);
 
  React.useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };
 
    loadUser();
  }, []);
 
  function handleChange(event) {
    setSearch(event.target.value);
  }
 
  return (
    <div>
      {user ? <p>Signed in as {user.name}</p> : null}
 
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
 
      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
}
If we want to test the component over the stretch of its first render to its second render due to the resolved promise, we have to write an async test, because we have to wait for the promise to resolve asynchronously. In other words, we have to wait for the user to be rendered after the component updates for one time after fetching it:

import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
 
    expect(screen.queryByText(/Signed in as/)).toBeNull();
 
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  });
});
After its initial render, we assert that the "Signed in as" text is not there by using the queryBy instead of the getBy search variant. Then we await the new element to be found, and it will be found eventually when the promise resolves and the component re-renders again.

If you don't believe that this actually works, include these two debug functions and verify their outputs on the command line:

import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
 
    expect(screen.queryByText(/Signed in as/)).toBeNull();
 
    screen.debug();
 
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
 
    screen.debug();
  });
});
For any element that isn't there yet but will be there eventually, use findBy over getBy or queryBy. If you assert for a missing element, use queryBy. Otherwise default to getBy.

What about multiple elements?
You have learned about the three search variants getBy, queryBy and findBy; which all can be associated with the search types (e.g. Text, Role, PlaceholderText, DisplayValue). If all of these search functions return only one element, how to assert if there are multiple elements (e.g. a list in a React component). All search variants can be extended with the All word:

getAllBy
queryAllBy
findAllBy
Whereas all of them return an array of elements and can be associated with the search types again.

Assertive Functions
Assertive functions happen on the right hand-side of your assertion. In the previous tests, you have used two assertive functions: toBeNull and toBeInTheDocument. Both are primarily used in React Testing Library to check whether an element is present or not.

Usually all these assertive functions origin from Jest. However, React Testing Library extends this API with its own assertive functions like toBeInTheDocument. All these assertive functions come in an extra package which are already set up for you when using create-react-app.

toBeDisabled
toBeEnabled
toBeEmpty
toBeEmptyDOMElement
toBeInTheDocument
toBeInvalid
toBeRequired
toBeValid
toBeVisible
toContainElement
toContainHTML
toHaveAttribute
toHaveClass
toHaveFocus
toHaveFormValues
toHaveStyle
toHaveTextContent
toHaveValue
toHaveDisplayValue
toBeChecked
toBePartiallyChecked
toHaveDescription
REACT TESTING LIBRARY: FIRE EVENT
So far, we've only tested whether an element rendered (or not) in a React component with getBy (and queryBy) and whether the re-rendered React component has a desired element (findBy). What about actual user interactions? If a user types into an input field, the component may re-render (like in our example), and the new value should be displayed (or used somewhere).

We can use RTL's fireEvent function to simulate interactions of an end user. Let's see how this works for our input field:

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    screen.debug();
 
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });
 
    screen.debug();
  });
});
The fireEvent function takes an element (here the input field by textbox role) and an event (here an event which has the value "JavaScript"). The debug function's output should show the HTML structure before and after the event; and you should see that the new value of the input field gets rendered appropriately.

In addition, if your component is involved in an asynchronous task, like our App component because it fetches a user, you may see the following warning showing up: "Warning: An update to App inside a test was not wrapped in act(...).". For us, this means there is some asynchronous task happening and we need to make sure that our components handles it. Often this can be done with RTL's act function, but this time we just need to wait for the user to resolve:

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
 
    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);
 
    screen.debug();
 
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });
 
    screen.debug();
  });
});
Afterward, we can make the assertions from before and after the event:

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
 
    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);
 
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
 
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });
 
    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});
We have used the queryBy search variant to check whether the element isn't there before the event and the getBy search variant to check whether it's there after the event. Sometimes you will see people use queryBy for the latter assertion too, because it can be used similar to getBy when it comes to elements which should be there.

That's it. Aside from the asynchronous behavior that we need to address in the test, RTL's fireEvent function can be used straightforward and assertions can be made afterward.

React Testing Library: User Event
React Testing Library comes with an extended user event library which builds up on top of the fireEvent API. Previously we have used fireEvent to trigger user interactions; this time we will use userEvent as replacement, because the userEvent API mimics the actual browser behavior more closely than the fireEvent API. For example, a fireEvent.change() triggers only a change event whereas userEvent.type triggers a change event, but also keyDown, keyPress, and keyUp events.

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
 
    // wait for the user to resolve
    await screen.findByText(/Signed in as/);
 
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
 
    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');
 
    expect(
      screen.getByText(/Searches for JavaScript/)
    ).toBeInTheDocument();
  });
});
Whenever possible, use userEvent over fireEvent when using React Testing Library. At the time of writing this, userEvent doesn't include all the features of fireEvent, however, this may change in the future.

REACT TESTING LIBRARY: CALLBACK HANDLERS
Sometimes you will test React components in isolation as unit tests. Often these components will not have any side-effects or state, but only input (props) and output (JSX, callback handlers). We have already seen how we can test the rendered JSX given a component and props. Now we will test callback handlers for this Search component:

function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
All the rendering and asserting happens as before. However, this time we are using a utility from Jest to mock the onChange function which is passed to the component. Then, after triggering the user interaction on the input field, we can assert that the onChange callback function has been called:

describe('Search', () => {
  test('calls the onChange callback handler', () => {
    const onChange = jest.fn();
 
    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );
 
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });
 
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
Here again, we can see how userEvent matches the user behavior in the browser more closely as fireEvent. While fireEvent executes the change event by only calling the callback function once, userEvent triggers it for every key stroke:

describe('Search', () => {
  test('calls the onChange callback handler', async () => {
    const onChange = jest.fn();
 
    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );
 
    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');
 
    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
Anyway, React Testing Library encourages you to test your React components not too much in isolation, but in integration (integration test) with other components. Only this way you can actually test whether state changes were applied in the DOM and whether side-effects took effect.

REACT TESTING LIBRARY: ASYNCHRONOUS / ASYNC
We have seen before how we can use async await when testing with React Testing Library in order to wait for certain elements to appear with the findBy search variant. Now we will go through a small example for testing data fetching in React. Let's take the following React component which uses axios for fetching data from a remote API:

import React from 'react';
import axios from 'axios';
 
const URL = 'http://hn.algolia.com/api/v1/search';
 
function App() {
  const [stories, setStories] = React.useState([]);
  const [error, setError] = React.useState(null);
 
  async function handleFetch(event) {
    let result;
 
    try {
      result = await axios.get(`${URL}?query=React`);
 
      setStories(result.data.hits);
    } catch (error) {
      setError(error);
    }
  }
 
  return (
    <div>
      <button type="button" onClick={handleFetch}>
        Fetch Stories
      </button>
 
      {error && <span>Something went wrong ...</span>}
 
      <ul>
        {stories.map((story) => (
          <li key={story.objectID}>
            <a href={story.url}>{story.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default App;
On button click, we are fetching a list of stories from the Hacker News API. If everything goes right, we will see the list of stories rendered as list in React. If something goes wrong, we will see an error. The test for the App component would look like the following:

import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import App from './App';
 
jest.mock('axios');
 
describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];
 
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );
 
    render(<App />);
 
    await userEvent.click(screen.getByRole('button'));
 
    const items = await screen.findAllByRole('listitem');
 
    expect(items).toHaveLength(2);
  });
});
Before we render the App component, we make sure that the API gets mocked. In our case, axios' return value from its get method gets mocked. However, if you are using another library or the browser's native fetch API for data fetching, you would have to mock these.

After mocking the API and rendering the component, we use the userEvent API to click to the button which leads us to the API request. Since the request is asynchronous, we have to wait for the component to update. As before, we are using RTL's findBy search variant to wait for element(s) which appear eventually.

import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import App from './App';
 
jest.mock('axios');
 
describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    ...
  });
 
  test('fetches stories from an API and fails', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error())
    );
 
    render(<App />);
 
    await userEvent.click(screen.getByRole('button'));
 
    const message = await screen.findByText(/Something went wrong/);
 
    expect(message).toBeInTheDocument();
  });
});
This last test shows you how to test an API request from your React component that fails. Instead of mocking the API with a promise that resolves successfully, we reject the promise with an error. After rendering the component and clicking the button, we wait for the error message to show up.

import React from 'react';
import axios from 'axios';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import App from './App';
 
jest.mock('axios');
 
describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];
 
    const promise = Promise.resolve({ data: { hits: stories } });
 
    axios.get.mockImplementationOnce(() => promise);
 
    render(<App />);
 
    await userEvent.click(screen.getByRole('button'));
 
    await act(() => promise);
 
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
 
  test('fetches stories from an API and fails', async () => {
    ...
  });
});
For the sake of completeness, this last test shows you how to await a promise in a more explicit way which also works if you don't want to wait for a HTML to show up.

After all, it's not too difficult to test async behavior in React with React Testing Library. You have to use Jest for mocking external modules (here remote API), and then just await data or re-renders of your React components in your tests.

React Testing Library is my go-to test library for React components. I have used Enzyme by Airbnb all the way before, but I like how React Testing Library moves you towards testing user behavior and not implementation details. You are testing whether your user can use your application by writing tests that resemble true user scenarios.