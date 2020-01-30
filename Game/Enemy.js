"use strict";
import Entity from "./Entity.js";
import game from "./Game.js";
import Vector2d from "./Vector.js";
import { randomInt } from "./functions.js";
//
// Enemy Object
//
function Enemy(position, speed, direction, rank) {
  Entity.call(this, position, speed, direction);

  this.width = 13;
  this.height = 10;
  this.rank = rank;

  this.dropTarget = 0;
  this.dropAmount = 1;
  this.timer = 0;
  this.firePercent = 10;
  this.fireWait = Math.random() * 5;
}
Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.init = function() {
  Entity.prototype.init.call(this);

  this.width = 13;
  this.height = 10;
  this.rank = 0;

  this.dropTarget = 0;
  this.dropAmount = 1;
  this.timer = 0;
  this.firePercent = 10;
  this.fireWait = Math.random() * 5;
};

Enemy.prototype.clone = function() {
  return new Enemy(this.position, this.speed, this.direction, this.rank);
};

Enemy.prototype.update = (function() {
  const p = new Vector2d(0, 0);

  function existsUnderneath(e) {
    const rect = e.collisionRect();
    if (!rect) {
      return false;
    }
    return p.y <= rect.top() && rect.left() <= p.x && p.x <= rect.right();
  }

  return function update(dt) {
    // Edge collision
    const enemiesLeft = game.enemiesRect().left(),
      enemiesRight = game.enemiesRect().right(),
      edgeMargin = 5,
      gameLeftEdge = game.gameFieldRect().left() + edgeMargin,
      gameRightEdge = game.gameFieldRect().right() - edgeMargin;

    Entity.prototype.update.call(this, dt);

    // Drop if the enemiesRect hits an edge margin
    if (
      (this.direction.x < 0 && enemiesLeft < gameLeftEdge) ||
      (this.direction.x > 0 && enemiesRight > gameRightEdge)
    ) {
      this.dropTarget += this.dropAmount;
    }

    // Determine Direction
    if (this.position.y < this.dropTarget) {
      this.direction.set(0, 1);
    } else if (this.direction.y > 0) {
      const x = enemiesRight > gameRightEdge ? -1 : 1;

      this.direction.set(x, 0);
    }

    // Determine Firing Weapon
    p.set(this.position.x, this.position.y + 5);

    this.timer += dt;
    if (this.timer > this.fireWait) {
      this.timer = 0;
      this.fireWait = 1 + Math.random() * 4;

      if (
        randomInt(100) < this.firePercent &&
        !game.enemies().find(existsUnderneath)
      ) {
        const proj = game.projectilePool().take();
        proj.position.set(p.x, p.y);
        proj.speed = 60;
        proj.direction.set(0, 1);
        proj.type = "enemy";

        game.addEntity(proj);
      }
    }
  };
})();

export default Enemy;
