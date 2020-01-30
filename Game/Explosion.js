"use strict";
import Entity from "./Entity.js";
//
// Explosion Object
//
function Explosion(position, speed, direction, rank, duration) {
  Entity.call(this, position, speed, direction);

  this.width = 13;
  this.height = 10;

  this.rank = rank;
  this.duration = duration;
}
Explosion.prototype = Object.create(Entity.prototype);

Explosion.prototype.update = function(dt) {
  Entity.prototype.update.call(this, dt);

  if (this.time > this.duration) {
    this.hp = 0;
  }
};

Explosion.prototype.init = function() {
  Entity.prototype.init.call(this);

  this.width = 13;
  this.height = 10;

  this.rank = 0;
  this.duration = 0;
};

Explosion.prototype.clone = function() {
  return new Explosion(
    this.position,
    this.speed,
    this.direction,
    this.rank,
    this.duration
  );
};

export default Explosion;
