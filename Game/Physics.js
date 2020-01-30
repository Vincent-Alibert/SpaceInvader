"use strict";
import game from "./Game.js";
import Vector2d from "./Vector.js";
//
// Physics Object
//
const physics = (function() {
  const velocityStep = new Vector2d(0, 0);

  function _collide(entity0, entity1) {
    if (
      entity0 &&
      entity1 &&
      entity0.collisionRect().intersects(entity1.collisionRect())
    ) {
      entity0.hp -= 1;
      entity1.hp -= 1;
    }
  }

  function _update(dt) {
    let entities = game.entities(),
      enemies = game.enemies(),
      projectiles = game.projectiles(),
      player = game.player();

    for (let i = entities.length - 1; i >= 0; i--) {
      let e = entities[i];
      velocityStep.set(e.direction.x, e.direction.y);
      velocityStep.scalarMultiply(e.speed * dt);

      e.position.add(velocityStep);
    }

    // Collision Detection

    // Player vs All enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      _collide(player, enemies[i]);
    }

    // Projectiles vs other Entities
    for (let i = projectiles.length - 1; i >= 0; i--) {
      // Enemy Projectiles vs Player
      if (projectiles[i].type === "enemy") {
        _collide(projectiles[i], player);
      }

      // Player Projectiles vs Enemies
      else if (projectiles[i].type === "player") {
        for (let j = enemies.length - 1; j >= 0; j--) {
          _collide(projectiles[i], enemies[j]);
        }
      }
    }

    // Enemy vs floor (special case)
    if (
      game.enemiesRect() &&
      player &&
      game.enemiesRect().bottom() > player.collisionRect().bottom()
    ) {
      game.setGameOver();
    }

    // Projectile leaves game field (special case)
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const proj = projectiles[i];
      if (!game.gameFieldRect().intersects(proj.collisionRect())) {
        proj.hp -= 1;
      }
    }
  }

  return {
    update: _update
  };
})();

export default physics;
