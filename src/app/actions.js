// action types
export const Actions = {
  MOVE: 'MOVE',
  UNDO: 'UNDO',
  REDO: 'REDO',
  NEW_GAME: 'NEW_GAME',
  SELECT_GAME: 'SELECT_GAME'
};

export function newGame () {
  return {
    type: Actions.NEW_GAME,
  };
};

export function selectGame (index) {
  return {
    type: Actions.SELECT_GAME,
    payload: {
      index: index
    }
  };
}

export function move (source, target) {
  return {
    type: Actions.MOVE,
    payload: {
      source,
      target
    }
  };
};

export function undo () {
  return {
    type: Actions.UNDO
  }
};

export function redo () {
  return {
    type: Actions.REDO
  }
};
