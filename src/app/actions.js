// action types
export const BoardActions = {
  MOVE: 'MOVE',
  UNDO: 'UNDO'
};

// action creators
export function move (source, target) {
  return {
    type: BoardActions.MOVE,
    payload: {
      source,
      target
    }
  };
}

export function undo () {
  return {
    type: BoardActions.UNDO
  }
}
