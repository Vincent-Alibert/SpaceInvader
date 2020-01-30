"use strict";
import Rectangle from "./Rectangle.js";
//
// Entity
//
function Entity(position, speed, direction) {
  this.position = position.clone();
  this.speed = speed;
  this.direction = direction.clone();
  this.time = 0;
  this.width = 5;
  this.height = 5;
  this.hp = 1;

  this._collisionRect = new Rectangle(
    this.position.x - this.width / 2,
    this.position.y - this.height / 2,
    this.width,
    this.height
  );
}

Entity.prototype.init = function() {
  this.position.set(0, 0);
  this.speed = 0;
  this.direction.set(0, 0);
  this.time = 0;
  this.width = 5;
  this.height = 5;
  this.hp = 1;
};

Entity.prototype.clone = function() {
  return new Entity(this.position, this.speed, this.direction);
};

Entity.prototype.update = function(dt) {
  this.time += dt;
};

Entity.prototype.collisionRect = function() {
  this._collisionRect.x = this.position.x - this.width / 2;
  this._collisionRect.y = this.position.y - this.height / 2;
  this._collisionRect.width = this.width;
  this._collisionRect.height = this.height;

  return this._collisionRect;
};

export default Entity;
