import Immutable from 'immutable';
import { BoardActions } from './actions.js';
import Chess from '../lib/chess.js';

// see http://redux.js.org/docs/recipes/ReducingBoilerplate.html#generating-reducers
const createReducer = function (initialState, handlers) {
  return function (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}

const buildBoard = function (board) {
  let newBoard = new Chess();
  newBoard.load_pgn(board.pgn());
  return newBoard;
}

const getHistory = function (board) {
  return Immutable.List(board.history({ verbose: true }));
}

const chessFiddleApp = createReducer(Immutable.Map({
  board: new Chess(),
  history: Immutable.List()
}), {
  [BoardActions.MOVE] (state, action) {
    let { source, target } = action.payload;

    let board = buildBoard(state.get('board'));
    if (board.move({
      from: source,
      to: target,
      promotion: 'q' // promote to queen
    })) {
      return state
        .set('board', board)
        .set('history', getHistory(board));
    } else {
      return state;
    }
  },

  [BoardActions.UNDO] (state, action) {
    let board = buildBoard(state.get('board'));
    board.undo();
    return state
      .set('board', board)
      .set('history', getHistory(board));
  }
});

export default chessFiddleApp;
