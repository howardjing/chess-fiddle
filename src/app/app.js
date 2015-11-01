import React from 'react';
import ReactDOM from 'react-dom';

import Board from './Board/Board';
import './App.less';

let rootEl = document.querySelector('#chess-fiddle');

let container = (
  <div>
    <h1>heyyyyy</h1>
    <Board />
  </div>
);

ReactDOM.render(
  container,
  rootEl
);
