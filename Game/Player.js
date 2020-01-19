"use strict";
function Player(position, speed, direction) {
  Entity.call(this, position, speed, direction);

  this.width = 20;
  this.height = 10;
}
Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function(dt) {
  Entity.prototype.update.call(this, dt);
  if (
    this.collisionRect().top() <= 0 ||
    this.collisionRect().bottom() >= game.gameFieldRect().bottom()
  ) {
    this.direction.y *= -1;
  }
};
