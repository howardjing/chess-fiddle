import { combineReducers } from 'redux';
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

const board = createReducer(new Chess(), {
  [BoardActions.MOVE] (state, action) {
    let { source, target } = action.payload;

    let newState = new Chess()
    newState.load_pgn(state.pgn());
    if (newState.move({
      from: source,
      to: target,
      promotion: 'q' // promote to queen
    })) {
      return newState;
    } else {
      return state;
    }
  }
});

const chessFiddleApp = combineReducers({
  board
});

export default chessFiddleApp;
