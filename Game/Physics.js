"use strict";
//
// Physics Object
//
var physics = (function() {
  function _update(dt) {
    var i,
      e,
      velocity,
      entities = game.entities();

    for (i = entities.length - 1; i >= 0; i--) {
      e = entities[i];
      velocity = vectorScalarMultiply(e.direction, e.speed);

      e.position = vectorAdd(e.position, vectorScalarMultiply(velocity, dt));
    }
  }

  return {
    update: _update
  };
})();
export default physics;
