import React, { Component, PropTypes } from 'react';

import Board from './Board/Board.js';
import Turns from './Turns/Turns.js';
import Controls from './Controls/Controls.js';
import EditableText from './EditableText/EditableText.js';
import styles from './Game.less';

class Game extends Component {

  render () {
    let {
      className,
      game,
      onMove,
      onUndo,
      onRedo,
      onDelete,
      onTitleEditing,
      onTitleEdited
    } = this.props;

    let title = game.get('title');
    let board = game.get('board');
    let history = game.get('history');
    let activeIndex = game.get('activeIndex');

    return (
      <div className={ className }>
        <EditableText
          className={ styles.title }
          value={ title }
          onEdited={ onTitleEdited }
          onEditing={ onTitleEditing }/>
        <Board
          board={ board }
          onMove={ onMove } />
        <Controls
          onUndo={ onUndo }
          onRedo={ onRedo }
          onDelete={ onDelete } />
        <Turns
          history={ history }
          activeIndex={ activeIndex } />
      </div>
    );
  }

}

Game.propTypes = {
  className: PropTypes.string,
  game: PropTypes.object.isRequired,

  // passed to editable title
  onTitleEditing: PropTypes.func.isRequired,
  onTitleEdited: PropTypes.func.isRequired,

  // passed to Board
  onMove: PropTypes.func.isRequired,

  // passed to Controls
  onRedo: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Game;
