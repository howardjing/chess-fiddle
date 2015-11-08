import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

// chess logic
import Game from '../../../lib/chess.js';

// chess gui -- exports global ChessBoard object
import '../../../lib/chessboardjs/css/chessboard.css';
import '../../../lib/chessboardjs/js/chessboard.js';

import styles from './Board.less';

class Board extends Component {

  constructor (props) {
    super(props);

    this.state = {
      // placeholder for the ChessBoard gui
      gui: {
        destroy() {}
      }
    };
  }

  _isValidMove(board, source, target, piece) {
    let moves = board.moves({ square: source, verbose: true });
    return !!Immutable.List(moves).find(function (move) {
      return move.to === target;
    });
  }

  _renderGui (props) {
    let { chessEl } = this.refs;
    let { board, onMove } = props;

    let oldGui = this.state.gui;
    oldGui.destroy();

    let gui = ChessBoard(chessEl, {
      draggable: true,
      position: board.fen(),

      onDrop: function (source, target, piece) {
        if (this._isValidMove(board, source, target, piece)) {
          onMove(source, target);
        } else {
          return 'snapback';
        }
      }.bind(this)
    });

    // update to use the new board
    this.setState({
      gui
    });
  }

  componentDidMount () {
    this._renderGui(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this._renderGui(nextProps);
  }

  componentWillUnmount () {
    let { gui } = this.state;
    gui.destroy();
  }

  render () {
    return (
      <div ref="chessEl" className={styles.board} />
    );
  }
}

Board.propTypes = {
  board: PropTypes.object.isRequired,
  onMove: PropTypes.func.isRequired
};

export default Board;
