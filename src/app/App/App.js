import React, { Component } from 'react';
import { connect } from 'react-redux';

import { move, undo, redo } from '../actions.js';
import Board from '../Board/Board.js';
import Turns from '../Turns/Turns.js';
import Controls from '../Controls/Controls.js';

class App extends Component {

  _move (source, target) {
    let { dispatch } = this.props;
    dispatch(move(source, target));
  }

  _undo () {
    let { dispatch } = this.props;
    dispatch(undo());
  }

  _redo () {
    let { dispatch } = this.props;
    dispatch(redo());
  }

  render () {
    let {
      board,
      history,
      activeIndex
    } = this.props;

    return (
      <div>
        <Board
          board={board}
          onMove={this._move.bind(this)} />
        <Controls
          onUndo={this._undo.bind(this)}
          onRedo={this._redo.bind(this)} />
        <Turns
          history={history}
          activeIndex={activeIndex} />
      </div>
    );
  }
}

// extract relevant properties from state
const select = function (state) {
  return {
    board: state.get('board'),
    history: state.get('history').toArray(),
    activeIndex: state.get('activeIndex')
  };
}

export default connect(select)(App);

