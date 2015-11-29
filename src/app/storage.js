class Storage {

  // storage is localStorage
  constructor(storage) {
    this.storage = storage
  }

  loadState () {
    let games = this._getGames();
    let activeGameIndex = this._getActiveGameIndex();

    return {
      games,
      activeGameIndex
    }
  }

  saveGame (index, game) {
    let games = this._getGames();
    games[index] = {
      title: game.title,
      history: game.history,
      activeIndex: game.activeIndex
    }

    this._storeGames(games);
  }

  saveActiveGameIndex (index) {
    this.storage.setItem('activeGameIndex', index);
  }

  saveTitle (gameIndex, title)  {
    this._updateGameProperty(gameIndex, 'title', title);
  }

  saveActiveIndex(gameIndex, activeIndex) {
    this._updateGameProperty(gameIndex, 'activeIndex', activeIndex);
  }

  saveHistory(gameIndex, history) {
    this._updateGameProperty(gameIndex, 'history', history);
  }

  deleteGameAt(index) {
    let games = this._getGames();
    games.splice(index, 1);
    this._storeGames(games);
  }

  _updateGameProperty(gameIndex, key, value) {
    let games = this._getGames();
    games[gameIndex][key] = value;
    this._storeGames(games);
  }

  _getGames () {
    return JSON.parse(this.storage.getItem('games')) || [];
  }

  _getActiveGameIndex () {
    let index = parseInt(this.storage.getItem('activeGameIndex'), 10);
    if (index === NaN) {
      return -1;
    } else {
      return index;
    }
  }

  _storeGames (games) {
    this.storage.setItem('games', JSON.stringify(games));
  }

};

export default Storage;
