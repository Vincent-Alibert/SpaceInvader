"use strict";
import Entity from "./Entity.js";
//
// Projectile
//
function Projectile(position, speed, direction, type) {
  Entity.call(this, position, speed, direction);

  this.width = 1;
  this.height = 5;
  this.type = type;
}

Projectile.prototype = Object.create(Entity.prototype);

Projectile.prototype.init = function() {
  Entity.prototype.init.call(this);

  this.width = 1;
  this.height = 5;
  this.type = "";
};

Projectile.prototype.clone = function() {
  return new Projectile(this.position, this.speed, this.direction, this.type);
};

export default Projectile;
