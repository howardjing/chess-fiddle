import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import chessFiddleApp from './reducers.js';
import App from './App/App.js';

import './index.less';

let rootEl = document.querySelector('#chess-fiddle');
let store = createStore(chessFiddleApp);

let container = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  container,
  rootEl
);
