"use strict";
//
// Cloneable Pool
//
function CloneablePool(cloneable) {
  this.template = cloneable;
  this.pool = [];
}

CloneablePool.prototype.take = function() {
  // If there is an available object, return it.
  for (let i = this.pool.length - 1; i >= 0; i--) {
    if (this.pool[i].available) {
      this.pool[i].available = false;
      this.pool[i].object.init();
      return this.pool[i].object;
    }
  }

  // Otherwise, create a new one and return it.
  const obj = this.template.clone();
  obj.init();
  this.pool.push({ available: false, object: obj });
  return obj;
};

CloneablePool.prototype.putBack = function(cloneable) {
  // Mark the object as available again.
  for (let i = this.pool.length - 1; i >= 0; i--) {
    if (this.pool[i].object === cloneable) {
      this.pool[i].available = true;
      break;
    }
  }
};
export default CloneablePool;
