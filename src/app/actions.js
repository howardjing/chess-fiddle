// action types
export const Actions = {
  MOVE: 'MOVE',
  UNDO: 'UNDO',
  REDO: 'REDO',
  NEW_GAME: 'NEW_GAME',
  DELETE_GAME: 'DELETE_GAME',
  SELECT_GAME: 'SELECT_GAME',
  LOAD_GAMES: 'LOAD_GAMES',
  EDIT_TITLE: 'EDIT_TITLE',
  SAVE_TITLE: 'SAVE_TITLE'
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
};

export function deleteGame (index) {
  return {
    type: Actions.DELETE_GAME,
    payload: {
      index: index
    }
  };
};

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

export function editTitle (title) {
  return {
    type: Actions.EDIT_TITLE,
    payload: {
      title: title
    }
  };
};

export function saveTitle () {
  return {
    type: Actions.SAVE_TITLE
  };
};
