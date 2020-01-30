"use strict";
import game from "./Game.js";
import Enemy from "./Enemy.js";
import Projectile from "./Projectile.js";
import Player from "./Player.js";
import Sprite from "./Sprite.js";
import Explosion from "./Explosion.js";
import PlayerExplosion from "./PlayerExplosion.js";
//
// Renderer Object
//
const renderer = (function() {
  let _canvas = document.getElementById("game-layer"),
    _context = _canvas.getContext("2d"),
    _projectileColors = {
      player: "rgb(196, 208, 106)",
      enemy: "rgb(96, 195, 96)"
    };

  const _playerSprite = new Sprite(
    "../assets/Invader/player.png",
    1,
    1,
    255,
    255,
    0
  );
  const _playerExplosionSprite = new Sprite(
    "../assets/Invader/player_explosion.png",
    2,
    4,
    255,
    255,
    0
  );

  const _enemySprites = [
    new Sprite("../assets/Invader/enemy0.png", 2, 2, 150, 7, 7),
    new Sprite("../assets/Invader/enemy1.png", 2, 2, 150, 89, 7),
    new Sprite("../assets/Invader/enemy2.png", 2, 2, 56, 150, 7),
    new Sprite("../assets/Invader/enemy3.png", 2, 2, 7, 150, 122),
    new Sprite("../assets/Invader/enemy4.png", 2, 2, 46, 7, 150)
  ];

  const _explosionSprites = [
    new Sprite("../assets/Invader/explosion.png", 1, 1, 150, 7, 7),
    new Sprite("../assets/Invader/explosion.png", 1, 1, 150, 89, 7),
    new Sprite("../assets/Invader/explosion.png", 1, 1, 56, 150, 7),
    new Sprite("../assets/Invader/explosion.png", 1, 1, 7, 150, 122),
    new Sprite("../assets/Invader/explosion.png", 1, 1, 46, 7, 150)
  ];

  const _sprites = [].concat(
    _playerSprite,
    _playerExplosionSprite,
    _enemySprites,
    _explosionSprites
  );

  let _previousLives = 0;

  function _drawSprite(sprite, entity) {
    _context.drawImage(
      sprite.image,
      (sprite.image.width / sprite.frames) * sprite.currentFrame,
      0,
      sprite.image.width / sprite.frames,
      sprite.image.height,
      entity.position.x - entity.width / 2,
      entity.position.y - entity.height / 2,
      entity.width,
      entity.height
    );
  }

  function _drawRectangle(color, entity) {
    _context.fillStyle = color;
    _context.fillRect(
      entity.position.x - entity.width / 2,
      entity.position.y - entity.height / 2,
      entity.width,
      entity.height
    );
  }

  function _render(dt) {
    let entity,
      _scaleFactor,
      entities = game.entities();

    // Calculate ScaleFactor
    _scaleFactor = _canvas.clientWidth / game.gameFieldRect().width;
    _scaleFactor = Math.max(1, Math.min(2, _scaleFactor));
    _canvas.width = game.gameFieldRect().width * _scaleFactor;
    _canvas.height = game.gameFieldRect().height * _scaleFactor;
    _context.scale(_scaleFactor, _scaleFactor);

    // Update the Sprites
    for (let i = _sprites.length - 1; i >= 0; i--) {
      _sprites[i].update(dt);
    }

    // Draw Background
    _context.fillStyle = "black";
    _context.fillRect(0, 0, _canvas.width, _canvas.height);

    // Draw Entities
    for (let i = entities.length - 1; i >= 0; i--) {
      entity = entities[i];

      if (entity instanceof Enemy) {
        _drawSprite(_enemySprites[entity.rank], entity);
      } else if (entity instanceof Player) {
        _drawSprite(_playerSprite, entity);
      } else if (entity instanceof PlayerExplosion) {
        _drawSprite(_playerExplosionSprite, entity);
      } else if (entity instanceof Explosion) {
        _drawSprite(_explosionSprites[entity.rank], entity);
      } else if (entity instanceof Projectile) {
        _drawRectangle(_projectileColors[entity.type], entity);
      }
    }

    // Draw Floor
    _context.strokeStyle = "#816d1a";
    _context.moveTo(0, game.gameFieldRect().height);
    _context.lineTo(game.gameFieldRect().width, game.gameFieldRect().height);
    _context.stroke();

    // Update UI
    _updateUI();
  }

  function _updateUI() {
    const scoreElement = document.getElementById("score");
    const highScoresElement = document.getElementById("highscores");
    const menuElement = document.getElementById("menu");
    const titleElement = document.getElementById("title");
    const livesElement = document.getElementById("lives");

    // Update Score
    const scoreText = "Score " + Math.round(game.score());
    if (scoreElement.innerHTML != scoreText) {
      scoreElement.innerHTML = scoreText;
    }

    // Update Player Lives
    if (_previousLives !== game.livesRemaining()) {
      _previousLives = game.livesRemaining();

      while (livesElement.hasChildNodes()) {
        livesElement.removeChild(livesElement.firstChild);
      }

      livesElement.innerHTML = "&nbsp;";

      // Add an image for each life
      for (let i = 0; i < game.livesRemaining(); i++) {
        const img = document.createElement("img");
        img.src = _playerSprite.image.src;
        img.style.marginRight = "5px";

        livesElement.appendChild(img);
      }
    }

    if (game.gameOver()) {
      // Update High Scores
      const scores = game.highScores();
      for (let i = 0; i < scores.length; i++) {
        const elem = document.getElementById("score" + i);
        elem.innerHTML = scores[i];
      }

      highScoresElement.style.display = "block";
      menuElement.style.display = "block";
      titleElement.style.display = "none";
    } else {
      highScoresElement.style.display = "none";
      menuElement.style.display = "none";
      titleElement.style.display = "none";
    }
  }

  return {
    render: _render
  };
})();

export default renderer;
