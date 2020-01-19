// Renderer Object
var renderer = (function() {
  function _drawEnemy(context, enemy) {
    context.fillStyle = "red";
    context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }

  function _drawPlayer(context, player) {
    context.fillStyle = "blue";
    context.fillRect(player.x, player.y, player.width, player.height);
  }

  function _render() {
    var canvas = document.getElementById("game-layer");
    var context = canvas.getContext("2d");

    context.fillStyle = "gray";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var i,
      entity,
      entities = game.entities();

    for (i = 0; i < entities.length; i++) {
      entity = entities[i];

      if (entity instanceof Enemy) {
        _drawEnemy(context, entity);
      } else if (entity instanceof Player) {
        _drawPlayer(context, entity);
      }
    }
  }

  return {
    render: _render
  };
})();

export default renderer;
