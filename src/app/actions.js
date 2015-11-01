// action types
export const BoardActions = {
  MOVE: 'MOVE'
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
