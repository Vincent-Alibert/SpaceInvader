"use strict";
function Player(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 20;
  this.direction = -1;
}
Player.prototype.update = function() {
  if (this.y <= 0 || this.y + this.height >= game.gameFieldHeight()) {
    this.direction *= -1;
  }
};

export default Player;
