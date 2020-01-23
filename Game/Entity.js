"use strict";
import Rectangle from "./Rectangle.js";
//
// Entity Object
//
function Entity(position, speed, direction) {
  this.position = position;
  this.speed = speed;
  this.direction = direction;
  this.time = 0;
  this.width = 5;
  this.height = 5;
  this.hp = 1;
}

Entity.prototype.update = function(dt) {
  this.time += dt;
};

Entity.prototype.collisionRect = function() {
  return new Rectangle(
    this.position.x - this.width / 2,
    this.position.y - this.height / 2,
    this.width,
    this.height
  );
};

export default Entity;
