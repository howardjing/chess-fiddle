import React, { Component } from 'react';

// chess logic
import Game from '../../lib/chess.js';

// chess gui -- exports global ChessBoard object
import '../../lib/chessboardjs/css/chessboard.css';
import '../../lib/chessboardjs/js/chessboard.js';

import styles from './Board.less';

class Board extends Component {

  constructor (props) {
    super(props);

    this.state = {
      // placeholder for the ChessBoard
      board: {
        destroy() {}
      },

      game: new Game()
    };
  }

  componentDidMount () {
    let { chessEl } = this.refs;
    let { game } = this.state;
    let board = ChessBoard(chessEl, {
      draggable: true,
      position: 'start',

      onDrop (source, target) {
        let move = game.move({
          from: source,
          to: target,
          promotion: 'q' // promote to queen
        });

        if (!move) {
          return 'snapback';
        }
      }
    });

    this.setState({
      board
    });
  }

  componentWillUnmount () {
    let { board } = this.state;
    board.destroy();
  }

  render () {
    return (
      <div ref="chessEl" className={styles.board} />
    );
  }
}

export default Board;
