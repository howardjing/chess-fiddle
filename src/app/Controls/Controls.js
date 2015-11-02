import React, { Component, PropTypes } from 'react';

class Controls extends Component {
  render () {
    let { onUndo } = this.props;
    return (
      <div>
        Controls:
        <button onClick={onUndo}>Undo</button>
      </div>
    );
  }
}

Controls.propTypes = {
  onUndo: PropTypes.func.isRequired
};

export default Controls;
