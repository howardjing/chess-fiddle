import React, { Component, PropTypes } from 'react';
import styles from './Controls.less';

class Controls extends Component {
  render () {
    let {
      onUndo,
      onRedo,
      onDelete
    } = this.props;
    return (
      <div className={ styles.container }>
        <div>
          Controls:
          <button onClick={ onUndo }>Undo</button>
          <button onClick={ onRedo }>Redo</button>
        </div>
        <div>
          <button onClick={ onDelete }>Delete</button>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Controls;
