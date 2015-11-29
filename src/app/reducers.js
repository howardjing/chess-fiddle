import Immutable from 'immutable';
import { Actions } from './actions.js';
import Chess from '../lib/chess.js';
import Storage from './storage.js';

let storage = new Storage(localStorage);

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
    board.move(move.toJS());
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
      title: `Untitled Game ${games.size}`,
      board: new Chess(),
      history: Immutable.List(),
      activeIndex: -1
    })
  );
};

const getActiveGameIndex = function (state) {
  return state.get('activeGameIndex');
}
const getActiveGame = function (state) {
  return state.getIn(['games', getActiveGameIndex(state)]);
};

const deserializeGames = function (games) {
  return games.map(function (game) {
    return game.set('board', reconstructBoard(game.get('history'), game.get('activeIndex')));
  });
};

const saveToStorage = function (state) {
  storage.saveGame(getActiveGameIndex(state), getActiveGame(state).toJS());
  storage.saveActiveGameIndex(getActiveGameIndex(state));
}

const getInitialState = function () {
  let state = Immutable.fromJS(storage.loadState());
  if (state.get('games').size === 0) {
    let newState = state
      .set('games', appendGame(state.get('games')))
      .set('activeGameIndex', 0);
    saveToStorage(newState);
    return newState;
  } else {
    return state
      .set('games', deserializeGames(state.get('games')))
  }
};

const canDeleteGame = function (games) {
  return games.size > 1;
}

const chessFiddleApp = createReducer(getInitialState(), {

  [Actions.NEW_GAME] (state) {
    let games = appendGame(state.get('games'));
    let newState = state
      .set('games', games)
      .set('activeGameIndex', games.size - 1);

    saveToStorage(newState);
    return newState;
  },

  [Actions.DELETE_GAME] (state, action) {
    let { index } = action.payload;

    // logic for determining what the new active
    // game is if we're deleting the active game
    var newIndex;
    if (index === getActiveGameIndex(state)) {
      if (index > 0) {
        newIndex = index - 1;
      } else {
        newIndex = 0;
      }
    } else {
      newIndex = index;
    }

    if (canDeleteGame(state.get('games'))) {
      storage.deleteGameAt(index);
      storage.saveActiveGameIndex(newIndex);

      return state
        .deleteIn(['games', index])
        .set('activeGameIndex', newIndex);
    } else {
      return state;
    }
  },

  [Actions.SELECT_GAME] (state, action) {
    let { index } = action.payload;
    let games = state.get('games');

    if (index >= 0 && index < games.size) {
      storage.saveActiveGameIndex(index);
      return state
        .set('activeGameIndex', index);
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
      let history = updateHistory(
        game.get('history'),
        game.get('activeIndex'),
        Immutable.fromJS(move)
      );
      let activeIndex = game.get('activeIndex') + 1;
      storage.saveHistory(gameIndex, history.toJS());
      storage.saveActiveIndex(gameIndex, activeIndex);
      return state
        .setIn(['games', gameIndex, 'board'], board)
        .setIn(['games', gameIndex, 'history'], history)
        .setIn(['games', gameIndex, 'activeIndex'], activeIndex);
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
      storage.saveActiveIndex(gameIndex, index);
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
      storage.saveActiveIndex(gameIndex, index);
      return state
        .setIn(['games', gameIndex, 'board'], board)
        .setIn(['games', gameIndex, 'activeIndex'], index);
    } else {
      return state;
    }
  },

  [Actions.EDIT_TITLE] (state, action) {
    let gameIndex = getActiveGameIndex(state);
    let game = getActiveGame(state);
    let { title } = action.payload;
    return state
      .setIn(['games', gameIndex, 'title'], title);
  },

  [Actions.SAVE_TITLE] (state) {
    let gameIndex = getActiveGameIndex(state);
    let title = state.getIn(['games', gameIndex, 'title']);

    storage.saveTitle(gameIndex, title);
    return state;
  }

});

export default chessFiddleApp;
