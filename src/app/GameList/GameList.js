import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './GameList.less';

class GameList extends Component {

  _renderGame (game, index) {
    let {
      activeGameIndex,
      onSelectGame
    } = this.props;

    return (
      <li key={index}
        onClick={onSelectGame.bind(this, index)}
        className={
          classNames({
            [styles.active]: activeGameIndex === index,
            [styles.clickable]: activeGameIndex !== index
          })
        }>
        {game.get('title')}
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
  activeGameIndex: PropTypes.number.isRequired,
  onNewGame: PropTypes.func.isRequired,
  onSelectGame: PropTypes.func.isRequired
};

export default GameList;
