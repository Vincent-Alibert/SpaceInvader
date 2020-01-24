"use strict";
import Rectangle, { rectUnion } from "./Rectangle.js";
import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Vector2d from "./Vector.js";
import physics from "./Physics.js";
import renderer from "./Render.js";
//
// Game Object
//
const game = (function() {
  let _lastFrameTime,
    _entities,
    _enemies,
    _player,
    _gameFieldRect,
    _enemiesRect,
    _enemySpeed,
    _enemyFirePercent,
    _enemyDropAmount,
    _started = false;

  function _start() {
    _lastFrameTime = 0;
    _entities = [];
    _enemies = [];
    _gameFieldRect = new Rectangle(0, 0, 300, 180);
    _enemiesRect = new Rectangle(0, 0, 0, 0);
    _enemySpeed = 10;
    _enemyFirePercent = 10;
    _enemyDropAmount = 1;

    this.addEntity(new Player(new Vector2d(140, 175), 90, new Vector2d(0, 0)));

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

  function _update(time) {
    const dt = Math.min((time - _lastFrameTime) / 1000, 3 / 60);
    _lastFrameTime = time;
    // Update Physics
    physics.update(dt);

    // Calculate the bounding rectangle around the enemies
    _enemiesRect = _enemies.reduce(function(rect, e) {
      return rectUnion(rect, e.collisionRect());
    }, undefined);

    // Update Entities
    for (let i = _entities.length - 1; i >= 0; i--) {
      _entities[i].update(dt);
    }
    // Update Enemy Speed
    const speed = _enemySpeed + _enemySpeed * (1 - _enemies.length / 50);
    for (let i = _enemies.length - 1; i >= 0; i--) {
      _enemies[i].speed = speed;
    }

    if (_enemies.length === 0) {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 5; j++) {
          const dropTarget = 10 + j * 20,
            position = new Vector2d(50 + i * 20, dropTarget - 100),
            direction = new Vector2d(1, 0),
            rank = 4 - j,
            enemy = new Enemy(position, _enemySpeed, direction, rank);

          enemy.dropTarget = dropTarget;
          enemy.firePercent = _enemyFirePercent;
          enemy.dropAmount = _enemyDropAmount;

          this.addEntity(enemy);
        }
      }

      _enemySpeed += 5;
      _enemyFirePercent += 5;
      _enemyDropAmount += 1;
    }

    // Render the frame

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
    },
    enemiesRect: function() {
      return _enemiesRect;
    }
  };
})();

export default game;
