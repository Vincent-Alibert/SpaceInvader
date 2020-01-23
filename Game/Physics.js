"use strict";
import game from "./Game.js";
import { vectorAdd, vectorScalarMultiply } from "./Vector.js";
//
// Physics Object
//
const physics = (function() {
  function _update(dt) {
    let e,
      velocity,
      entities = game.entities();

    for (let i = entities.length - 1; i >= 0; i--) {
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
