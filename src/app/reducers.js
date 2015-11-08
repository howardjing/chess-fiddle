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
};

// clone board from existing board
const cloneBoard = function (board) {
  let clone = new Chess();
  clone.load_pgn(board.pgn());
  return clone;
};

// reconstructs board based on history up to the current index
const reconstructBoard = function (history, index) {
  let board = new Chess();
  history.take(index + 1).forEach(function (move) {
    board.move(move);
  });
  return board;
}

// appends move to history discarding moves past the given index
const updateHistory = function (history, index, move) {
  return history.take(index + 1).push(move);
};

const chessFiddleApp = createReducer(Immutable.Map({
  board: new Chess(),
  history: Immutable.List(),
  activeIndex: -1
}), {

  [BoardActions.MOVE] (state, action) {
    let { source, target } = action.payload;
    let board = cloneBoard(state.get('board'));
    let move = board.move({
      from: source,
      to: target,
      promotion: 'q' // promote to queen
    });

    if (move) {
      return state
        .set('board', board)
        .set('history', updateHistory(state.get('history'), state.get('activeIndex'), move))
        .set('activeIndex', state.get('activeIndex') + 1);
    } else {
      return state;
    }
  },

  [BoardActions.UNDO] (state, action) {
    if (state.get('activeIndex') >= 0) {
      let index = state.get('activeIndex') - 1;
      let board = reconstructBoard(state.get('history'), index);
      return state
        .set('board', board)
        .set('activeIndex', index);
    } else {
      return state;
    }
  },

  [BoardActions.REDO] (state, action) {
    if (state.get('activeIndex') < state.get('history').size - 1) {
      let index = state.get('activeIndex') + 1;
      let board = reconstructBoard(state.get('history'), index);
      return state
        .set('board', board)
        .set('activeIndex', index);
    } else {
      return state;
    }
  }
});

export default chessFiddleApp;
