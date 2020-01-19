"use strict";
// Physics Object
var physics = (function() {
  function _update() {
    var i,
      entities = game.entities();

    for (i = 0; i < entities.length; i++) {
      entities[i].y += entities[i].direction;
    }
  }

  return {
    update: _update
  };
})();

export default physics;
