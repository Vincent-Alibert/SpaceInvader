"use strict";
import Entity from "./Entity.js";
import game from "./Game.js";
import Vector2d, { vectorAdd } from "./Vector.js";
import { randomInt } from "./functions.js";
//
// Enemy Object
//
function Enemy(position, speed, direction, rank) {
  Entity.call(this, position, speed, direction);
  vectorAdd;
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

Enemy.prototype.update = function(dt) {
  // Edge collision
  const enemiesLeft = game.enemiesRect().left();
  const enemiesRight = game.enemiesRect().right();
  const edgeMargin = 5;
  const gameLeftEdge = game.gameFieldRect().left() + edgeMargin;
  const gameRightEdge = game.gameFieldRect().right() - edgeMargin;
  const p = vectorAdd(this.position, new Vector2d(0, 5));

  function existsUnderneath(e) {
    const rect = e.collisionRect();
    return p.y <= rect.top() && rect.left() <= p.x && p.x <= rect.right();
  }

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
    this.direction = new Vector2d(0, 1);
  } else if (this.direction.y > 0) {
    this.direction =
      enemiesRight > gameRightEdge ? new Vector2d(-1, 0) : new Vector2d(1, 0);
  }
  // Determine Firing Weapon

  this.timer += dt;
  if (this.timer > this.fireWait) {
    this.timer = 0;
    this.fireWait = 1 + Math.random() * 4;

    if (
      randomInt(100) < this.firePercent &&
      !game.enemies().find(existsUnderneath)
    ) {
      this.fire(p);
    }
  }
};

Enemy.prototype.fire = function(position) {
  console.log("Fire to be implemented");
};
export default Enemy;
