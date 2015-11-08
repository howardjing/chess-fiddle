import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './GameList.less';

class GameList extends Component {

  _renderGame (game, index) {
    let {
      selectedGameIndex,
      onSelectGame
     } = this.props;

    return (
      <li key={index}
        onClick={onSelectGame.bind(this, index)}>
        <span className={
          classNames({
            [styles.active]: selectedGameIndex === index
          })
        }>
          {game.get('title')}
        </span>
      </li>
    );
  }

  render () {
    let {
      games,
      className,
      onNewGame
    } = this.props;

    return (
      <div className={className}>
        <h3>Games</h3>
        <ul>
          { games.map(this._renderGame.bind(this)) }
        </ul>
        <button onClick={onNewGame}>New Game</button>
      </div>
    );
  }

}

GameList.propTypes = {
  className: PropTypes.string,
  games: PropTypes.object.isRequired,
  selectedGameIndex: PropTypes.number.isRequired,
  onNewGame: PropTypes.func.isRequired,
  onSelectGame: PropTypes.func.isRequired
};

export default GameList;
