"use strict";
import Entity from "./Entity.js";
import Vector2d from "./Vector.js";
//
// Player Explosion
//
function PlayerExplosion(position, duration) {
  Entity.call(this, position, 0, new Vector2d(0, 0));

  this.width = 20;
  this.height = 10;
  this.duration = duration;
}
PlayerExplosion.prototype = Object.create(Entity.prototype);

PlayerExplosion.prototype.update = function(dt) {
  Entity.prototype.update.call(this, dt);
  if (this.time > this.duration) {
    this.hp = 0;
  }
};
export default PlayerExplosion;
