"use strict";
//
// Renderer Object
//
var renderer = (function() {
  var _canvas = document.getElementById("game-layer"),
    _context = _canvas.getContext("2d"),
    _enemyColors = [
      "rgb(150, 7, 7)",
      "rgb(150, 89, 7)",
      "rgb(56, 150, 7)",
      "rgb(7, 150, 122)",
      "rgb(46, 7, 150)"
    ];

  function _drawRectangle(color, entity) {
    _context.fillStyle = color;
    _context.fillRect(
      entity.position.x - entity.width / 2,
      entity.position.y - entity.height / 2,
      entity.width,
      entity.height
    );
  }

  function _render(dt) {
    _context.fillStyle = "black";
    _context.fillRect(0, 0, _canvas.width, _canvas.height);

    var i,
      entity,
      entities = game.entities();

    for (i = entities.length - 1; i >= 0; i--) {
      entity = entities[i];

      if (entity instanceof Enemy) {
        _drawRectangle(_enemyColors[entity.rank], entity);
      } else if (entity instanceof Player) {
        _drawRectangle("rgb(255, 255, 0)", entity);
      }
    }
  }

  return {
    render: _render
  };
})();

export default renderer;
