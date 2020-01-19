"use strict";
// Game Object
var game = (function() {
  var _gameFieldHeight = 200;
  var _entities = [];

  function _start() {
    _entities.push(new Player(100, 175));
    _entities.push(new Enemy(20, 25));
    _entities.push(new Enemy(80, 25));
    _entities.push(new Enemy(160, 25));

    window.requestAnimationFrame(this.update.bind(this));
  }

  function _update() {
    physics.update();

    var i;
    for (i = 0; i < _entities.length; i++) {
      _entities[i].update();
    }

    renderer.render();

    window.requestAnimationFrame(this.update.bind(this));
  }

  return {
    start: _start,
    update: _update,
    entities: function() {
      return _entities;
    },
    gameFieldHeight: function() {
      return _gameFieldHeight;
    }
  };
})();

export default game;
