"use strict";
import Entity from "./Entity.js";
import game from "./Game.js";
//
// Enemy Object
//
function Enemy(position, speed, direction, rank) {
  Entity.call(this, position, speed, direction);

  this.width = 13;
  this.height = 10;
  this.rank = rank;
}
Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function(dt) {
  Entity.prototype.update.call(this, dt);
  if (
    this.collisionRect().top() <= 0 ||
    this.collisionRect().bottom() >= game.gameFieldRect().bottom()
  ) {
    this.direction.y *= -1;
  }
};

export default Enemy;
