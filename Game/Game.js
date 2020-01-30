"use strict";
import Rectangle from "./Rectangle.js";
import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Projectile from "./Projectile.js";
import Vector2d from "./Vector.js";
import physics from "./Physics.js";
import renderer from "./Render.js";
import PlayerExplosion from "./PlayerExplosion.js";
import Explosion from "./Explosion.js";
import CloneablePool from "./CloneablePool.js";
import { mutableRemoveIndex } from "./functions.js";
//
// Game Object
//
const game = (function() {
  let _entities,
    _enemies,
    _player,
    _gameFieldRect,
    _started = false,
    _lastFrameTime,
    _enemiesRect,
    _enemySpeed,
    _enemyFirePercent,
    _enemyDropAmount,
    _projectiles,
    _livesRemaining,
    _gameOver,
    _score,
    _highScores;

  let _updateFunc;

  const _enemyPool = new CloneablePool(
    new Enemy(new Vector2d(0, 0), 0, new Vector2d(0, 0), 0)
  );
  const _projectilePool = new CloneablePool(
    new Projectile(new Vector2d(0, 0), 0, new Vector2d(0, 0), "")
  );
  const _explosionPool = new CloneablePool(
    new Explosion(new Vector2d(0, 0), 0, new Vector2d(0, 0), 0, 0)
  );

  function _start() {
    _lastFrameTime = 0;

    _entities = [];
    _enemies = [];
    _gameFieldRect = new Rectangle(0, 0, 300, 180);
    _enemiesRect = new Rectangle(0, 0, 0, 0);
    _enemySpeed = 10;
    _enemyFirePercent = 10;
    _enemyDropAmount = 1;
    _projectiles = [];
    _livesRemaining = 2;
    _gameOver = false;
    _score = 0;
    _highScores = [];

    if (typeof Storage !== "undefined") {
      try {
        _highScores = JSON.parse(localStorage.invadersScores);
      } catch (e) {
        _highScores = [];
      }
    }

    this.addEntity(new Player(new Vector2d(100, 175), 90, new Vector2d(0, 0)));

    if (!_started) {
      _updateFunc = this.update.bind(this);
      window.requestAnimationFrame(_updateFunc);
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

    if (entity instanceof Projectile) {
      _projectiles.push(entity);
    }
  }

  function _removeEntities(entities) {
    if (entities.length === 0) {
      return;
    }

    for (let i = entities.length - 1; i >= 0; i--) {
      let idx = _entities.indexOf(entities[i]);
      if (idx >= 0) {
        mutableRemoveIndex(_entities, idx);
      }

      idx = _enemies.indexOf(entities[i]);
      if (idx >= 0) {
        mutableRemoveIndex(_enemies, idx);
        _enemyPool.putBack(entities[i]);
      }

      idx = _projectiles.indexOf(entities[i]);
      if (idx >= 0) {
        mutableRemoveIndex(_projectiles, idx);
        _projectilePool.putBack(entities[i]);
      }

      _explosionPool.putBack(entities[i]);
    }

    if (entities.includes(_player)) {
      _player = undefined;
    }
  }

  function _update(time) {
    let dt = Math.min((time - _lastFrameTime) / 1000, 3 / 60);

    _lastFrameTime = time;

    if (_gameOver) {
      _started = false;
      return;
    }

    // Update Physics
    physics.update(dt);

    // Calculate the bounding rectangle around the enemies
    if (_enemies.length > 0) {
      // Prime _enemiesRect
      const rect = _enemies[0].collisionRect();
      _enemiesRect.set(rect.x, rect.y, rect.width, rect.height);

      // Calculate the rest of the enemiesRect
      for (let i = _enemies.length - 1; i >= 0; i--) {
        _enemiesRect.union(_enemies[i].collisionRect());
      }
    }

    // Update Entities
    for (let i = _entities.length - 1; i >= 0; i--) {
      _entities[i].update(dt);
    }

    // Delete dead objects.
    const removeEntities = [];
    for (let i = _entities.length - 1; i >= 0; i--) {
      const e = _entities[i];
      if (e.hp <= 0) {
        removeEntities.push(e);

        if (e instanceof Enemy) {
          _score += e.rank + 1;

          const exp = _explosionPool.take();
          exp.position.set(e.position.x, e.position.y);
          exp.speed = e.speed;
          exp.direction.set(e.direction.x, e.direction.y);
          exp.rank = e.rank;
          exp.duration = 5 / 60;

          this.addEntity(exp);
        } else if (e instanceof Player) {
          _livesRemaining--;
          this.addEntity(new PlayerExplosion(e.position, 2));
        } else if (e instanceof PlayerExplosion) {
          this.addEntity(
            new Player(new Vector2d(100, 175), 90, new Vector2d(0, 0))
          );
        }
      }
    }
    _removeEntities(removeEntities);

    // Update Enemy Speed
    const speed = _enemySpeed + _enemySpeed * (1 - _enemies.length / 50);
    for (let i = _enemies.length - 1; i >= 0; i--) {
      _enemies[i].speed = speed;
    }

    // Create new Enemies if there are 0
    if (_enemies.length === 0) {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 5; j++) {
          const dropTarget = 10 + j * 20,
            enemy = _enemyPool.take();

          enemy.position.set(50 + i * 20, dropTarget - 100);
          enemy.direction.set(1, 0);
          enemy.speed = _enemySpeed;
          enemy.rank = 4 - j;

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

    // Check for Game Over
    if (_livesRemaining < 0 && !_gameOver) {
      _setGameOver();
    }

    // Render the frame
    renderer.render(dt);

    window.requestAnimationFrame(_updateFunc);
  }

  function _addScore(score) {
    _highScores.push(score);
    _highScores.sort(function(a, b) {
      return b - a;
    });
    _highScores = _highScores.slice(0, 10);

    if (typeof Storage !== "undefined") {
      localStorage.invadersScores = JSON.stringify(_highScores);
    }
  }

  function _setGameOver() {
    _gameOver = true;
    _addScore(Math.round(game.score()));
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
    },
    projectiles: function() {
      return _projectiles;
    },
    score: function() {
      return _score;
    },
    highScores: function() {
      return _highScores;
    },
    livesRemaining: function() {
      return _livesRemaining;
    },
    gameOver: function() {
      return _gameOver;
    },
    setGameOver: _setGameOver,
    projectilePool: function() {
      return _projectilePool;
    }
  };
})();

export default game;
