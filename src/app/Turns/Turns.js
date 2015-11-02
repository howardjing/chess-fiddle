import React, { Component, PropTypes } from 'react';

class Turns extends Component {

  _renderTurn (move, index) {
    return (
      <li key={index}>{ move.color }: { move.from } -> { move.to }</li>
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
  history: PropTypes.array.isRequired
};

export default Turns;
