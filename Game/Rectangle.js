"use strict";
//
// Rectangle Object
//
function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Rectangle.prototype.set = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
};

Rectangle.prototype.clone = function() {
  return new Rectangle(this.x, this.y, this.width, this.height);
};

Rectangle.prototype.left = function() {
  return this.x;
};

Rectangle.prototype.right = function() {
  return this.x + this.width;
};

Rectangle.prototype.top = function() {
  return this.y;
};

Rectangle.prototype.bottom = function() {
  return this.y + this.height;
};

Rectangle.prototype.intersects = function(r2) {
  return (
    this.right() >= r2.left() &&
    this.left() <= r2.right() &&
    this.top() <= r2.bottom() &&
    this.bottom() >= r2.top()
  );
};

Rectangle.prototype.containsPoint = function(x, y) {
  return (
    this.left() <= x &&
    x <= this.right() &&
    this.top() <= y &&
    y <= this.bottom()
  );
};

Rectangle.prototype.union = function(r2) {
  var x, y, width, height;

  if (r2 === undefined) {
    return;
  }

  x = Math.min(this.x, r2.x);
  y = Math.min(this.y, r2.y);

  width = Math.max(this.right(), r2.right()) - Math.min(this.left(), r2.left());

  height =
    Math.max(this.bottom(), r2.bottom()) - Math.min(this.top(), r2.top());

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

export default Rectangle;
