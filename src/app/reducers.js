import Immutable from 'immutable';
import { Actions } from './actions.js';
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

const appendGame = function (games) {
  return games.push(
    Immutable.Map({
      title: `Game ${games.size}`,
      board: new Chess(),
      history: Immutable.List(),
      activeIndex: -1
    })
  );
};

const getInitialState = function () {
  return Immutable.Map({
    games: appendGame(Immutable.List()),
    selectedGameIndex: 0
  });
};

const getActiveGameIndex = function (state) {
  return state.get('selectedGameIndex');
}
const getActiveGame = function (state) {
  return state.getIn(['games', getActiveGameIndex(state)]);
};

const chessFiddleApp = createReducer(getInitialState(), {

  [Actions.NEW_GAME] (state) {
    let games = appendGame(state.get('games'));
    return state
      .set('games', games)
      .set('selectedGameIndex', games.size - 1);
  },

  [Actions.SELECT_GAME] (state, action) {
    let { index } = action.payload;
    let games = state.get('games');

    if (index >= 0 && index < games.size) {
      return state
        .set('selectedGameIndex', index);
    } else {
      return state;
    }
  },

  [Actions.MOVE] (state, action) {
    let { source, target } = action.payload;
    let gameIndex = getActiveGameIndex(state);
    let game = getActiveGame(state);
    let board = cloneBoard(game.get('board'));
    let move = board.move({
      from: source,
      to: target,
      promotion: 'q' // promote to queen
    });

    if (move) {
      return state
        .setIn(['games', gameIndex, 'board'], board)
        .setIn(['games', gameIndex, 'history'], updateHistory(
                                                  game.get('history'),
                                                  game.get('activeIndex'),
                                                  move
                                                ))
        .setIn(['games', gameIndex, 'activeIndex'], game.get('activeIndex') + 1);
    } else {
      return state;
    }
  },

  [Actions.UNDO] (state) {
    let gameIndex = getActiveGameIndex(state);
    let game = getActiveGame(state);
    if (game.get('activeIndex') >= 0) {
      let index = game.get('activeIndex') - 1;
      let board = reconstructBoard(game.get('history'), index);
      return state
        .setIn(['games', gameIndex, 'board'], board)
        .setIn(['games', gameIndex, 'activeIndex'], index);
    } else {
      return state;
    }
  },

  [Actions.REDO] (state) {
    let gameIndex = getActiveGameIndex(state);
    let game = getActiveGame(state);
    if (game.get('activeIndex') < game.get('history').size - 1) {
      let index = game.get('activeIndex') + 1;
      let board = reconstructBoard(game.get('history'), index);
      return state
        .setIn(['games', gameIndex, 'board'], board)
        .setIn(['games', gameIndex, 'activeIndex'], index);
    } else {
      return state;
    }
  }
});

export default chessFiddleApp;
