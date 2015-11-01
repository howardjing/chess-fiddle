// chess logic
import Chess from '../lib/chess.js';

// chess gui
import '../lib/chessboardjs/css/chessboard.css';
import '../lib/chessboardjs/js/chessboard.js';

// app specific stuff
import './styles.less';

let chess = new Chess();
let board = ChessBoard('board', {
  draggable: true,
  position: 'start',

  // source: d7
  // target: e7
  // piece: bP
  // newPosition: new board state
  // oldPosition: old board state
  // orientation: black
  onDrop: function (source, target, piece, newPosition, oldPosition, orientation) {
    let move = chess.move({
      from: source,
      to: target
    });

    if (!move) {
      return 'snapback';
    }
  }
});
