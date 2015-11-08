import React, { Component } from 'react';
import { connect } from 'react-redux';

import { move, undo, redo, newGame, selectGame } from '../actions.js';
import Game from '../Game/Game.js';
import GameList from '../GameList/GameList.js';
import styles from './App.less';

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

  _startNewGame () {
    let { dispatch } = this.props;
    dispatch(newGame());
  }

  _selectGame (index) {
    let { dispatch } = this.props;
    dispatch(selectGame(index));
  }

  render () {
    let {
      games,
      selectedGameIndex
    } = this.props;

    let selectedGame = games.get(selectedGameIndex);
    return (
      <div className={styles.container}>
        <Game className={styles.primary}
          game={selectedGame}
          onMove={this._move.bind(this)}
          onUndo={this._undo.bind(this)}
          onRedo={this._redo.bind(this)} />
        <GameList className={styles.secondary}
          games={games}
          selectedGameIndex={selectedGameIndex}
          onSelectGame={this._selectGame.bind(this)}
          onNewGame={this._startNewGame.bind(this)} />
      </div>
    );
  }
}

// extract relevant properties from state
const select = function (state) {
  return {
    games: state.get('games'),
    selectedGameIndex: state.get('selectedGameIndex')
  };
};

export default connect(select)(App);

