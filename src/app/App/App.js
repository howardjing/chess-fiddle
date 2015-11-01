import React, { Component } from 'react';
import { connect } from 'react-redux';

import { move } from '../actions.js';
import Board from '../Board/Board.js';

class App extends Component {

  _move (source, target) {
    let { dispatch } = this.props;
    dispatch(move(source, target));
  }

  render () {
    let { board } = this.props;
    return (
      <Board
        board={board}
        onMove={this._move.bind(this)} />
    );
  }
}

// extract relevant properties from state
const select = function (state) {
  return {
    board: state.board
  };
}

export default connect(select)(App);

