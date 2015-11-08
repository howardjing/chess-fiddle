import React, { Component, PropTypes } from 'react';

class Controls extends Component {
  render () {
    let {
      onUndo,
      onRedo
    } = this.props;
    return (
      <div>
        Controls:
        <button onClick={onUndo}>Undo</button>
        <button onClick={onRedo}>Redo</button>
      </div>
    );
  }
}

Controls.propTypes = {
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired
};

export default Controls;
