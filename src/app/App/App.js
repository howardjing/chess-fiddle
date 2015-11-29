import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  move,
  undo,
  redo,
  newGame,
  deleteGame,
  selectGame,
  loadGames,
  editTitle,
  saveTitle
} from '../actions.js';
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

  _onEditingTitle (title) {
    let { dispatch } = this.props;
    dispatch(editTitle(title));
  }

  _onEditedTitle () {
    let { dispatch } = this.props;
    dispatch(saveTitle());
  }

  _onDeleteActiveGame () {
    let { dispatch, activeGameIndex } = this.props;
    dispatch(deleteGame(activeGameIndex))
  }

  render () {
    let {
      games,
      activeGameIndex
    } = this.props;


    let activeGame = games.get(activeGameIndex);
    return (
      <div className={ styles.container }>
        <Game className={ styles.primary }
          game={ activeGame }

          onTitleEditing={ this._onEditingTitle.bind(this) }
          onTitleEdited={ this._onEditedTitle.bind(this) }

          onMove={ this._move.bind(this) }
          onUndo={ this._undo.bind(this) }
          onRedo={ this._redo.bind(this) }

          onDelete={ this._onDeleteActiveGame.bind(this) } />

        <GameList className={ styles.secondary }
          games={ games }
          activeGameIndex={ activeGameIndex }
          onSelectGame={ this._selectGame.bind(this) }
          onNewGame={ this._startNewGame.bind(this) } />
      </div>
    );
  }
}

// extract relevant properties from state
const select = function (state) {
  return {
    games: state.get('games'),
    activeGameIndex: state.get('activeGameIndex')
  };
};

export default connect(select)(App);

