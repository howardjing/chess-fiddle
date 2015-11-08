import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Turns.less';

class Turns extends Component {

  _renderTurn (move, index) {
    let { activeIndex } = this.props;


    return (
      <li key={index}>
        <span className={
          classNames({
          [styles.active]: activeIndex === index
          })
        }>
          { move.color }: { move.from } -> { move.to }
        </span>
      </li>
    );
  }

  render () {
    let { history } = this.props;

    return (
      <ul>
        History
        { history.map(this._renderTurn.bind(this)) }
      </ul>
    );
  }

}

Turns.propTypes = {
  history: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired
};

export default Turns;
