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

function rectUnion(r1, r2) {
  let x, y, width, height;

  if (r1 === undefined) {
    return r2;
  }
  if (r2 === undefined) {
    return r1;
  }

  x = Math.min(r1.x, r2.x);
  y = Math.min(r1.y, r2.y);
  width = Math.max(r1.right(), r2.right()) - Math.min(r1.left(), r2.left());
  height = Math.max(r1.bottom(), r2.bottom()) - Math.min(r1.top(), r2.top());

  return new Rectangle(x, y, width, height);
}

export default Rectangle;
