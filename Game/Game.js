"use strict";
import Rectangle from "./Rectangle.js";
import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Vector2d from "./Vector.js";
import physics from "./Physics.js";
import renderer from "./Render.js";
//
// Game Object
//
const game = (function() {
  let _entities,
    _enemies,
    _player,
    _gameFieldRect,
    _started = false;

  function _start() {
    _entities = [];
    _enemies = [];
    _gameFieldRect = new Rectangle(0, 0, 300, 180);

    this.addEntity(new Player(new Vector2d(100, 175), 25, new Vector2d(0, -1)));
    this.addEntity(new Enemy(new Vector2d(20, 25), 20, new Vector2d(0, 1), 0));
    this.addEntity(new Enemy(new Vector2d(50, 25), 10, new Vector2d(0, 1), 1));
    this.addEntity(new Enemy(new Vector2d(80, 25), 15, new Vector2d(0, 1), 2));
    this.addEntity(new Enemy(new Vector2d(120, 25), 25, new Vector2d(0, 1), 3));
    this.addEntity(new Enemy(new Vector2d(140, 25), 30, new Vector2d(0, 1), 4));

    if (!_started) {
      window.requestAnimationFrame(this.update.bind(this));
      _started = true;
    }
  }

  function _addEntity(entity) {
    _entities.push(entity);

    if (entity instanceof Player) {
      _player = entity;
    }

    if (entity instanceof Enemy) {
      _enemies.push(entity);
    }
  }

  function _removeEntities(entities) {
    if (!entities) return;

    function isNotInEntities(item) {
      return !entities.includes(item);
    }
    _entities = _entities.filter(isNotInEntities);
    _enemies = _enemies.filter(isNotInEntities);

    if (entities.includes(_player)) {
      _player = undefined;
    }
  }

  function _update() {
    const dt = 1 / 60; // Fixed 60 frames per second time step
    physics.update(dt);

    for (let i = _entities.length - 1; i >= 0; i--) {
      _entities[i].update(dt);
    }

    renderer.render(dt);

    window.requestAnimationFrame(this.update.bind(this));
  }

  return {
    start: _start,
    update: _update,
    addEntity: _addEntity,
    entities: function() {
      return _entities;
    },
    enemies: function() {
      return _enemies;
    },
    player: function() {
      return _player;
    },
    gameFieldRect: function() {
      return _gameFieldRect;
    }
  };
})();

export default game;
