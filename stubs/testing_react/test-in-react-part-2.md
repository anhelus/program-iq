## Jest Snapshot Testing in React (ALTRO ARTICOLO)

Jest ha introdotto il concetto del cosiddetto Snapshot Test. In pratica, uno Snapshot Test crea uno snapshot - che viene memorizzato in un file separato - dell'output restituito dal componente quando eseguiamo il nostro test.

Questo snapshot è usato per valutare la differenza rispetto al prossimo snapshot quando si eseguono nuovamente i nostri test. Se l'output renderizzato dal componente è cambiato, la differenza di entrambi gli snapshot lo mostreà, e lo Snapshot Test fallirà.

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
