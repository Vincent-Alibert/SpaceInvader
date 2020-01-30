"use strict";
//
// Vector2d Object
//

const Vector2d = function(x, y) {
  this.x = x;
  this.y = y;
};

Vector2d.prototype.set = function(x, y) {
  this.x = x;
  this.y = y;
};

Vector2d.prototype.clone = function() {
  return new Vector2d(this.x, this.y);
};

Vector2d.prototype.add = function(v2) {
  this.x += v2.x;
  this.y += v2.y;
};

Vector2d.prototype.subtract = function(v2) {
  this.x -= v2.x;
  this.y -= v2.y;
};

Vector2d.prototype.scalarMultiply = function(s) {
  this.x *= s;
  this.y *= s;
};

export function vectorLength(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function vectorNormalize(v) {
  var reciprocal = 1.0 / (vectorLength(v) + 1.0e-37); // Prevent division by zero.
  return vectorScalarMultiply(v, reciprocal);
}

export default Vector2d;
