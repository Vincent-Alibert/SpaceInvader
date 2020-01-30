"use strict";
import Entity from "./Entity.js";

function Player(position, speed, direction) {
  Entity.call(this, position, speed, direction);

  this.width = 20;
  this.height = 10;
  this.movingLeft = false;
  this.movingRight = false;
}
Player.prototype = Object.create(Entity.prototype);

Player.prototype.updateDirection = function() {
  let x = 0;
  if (this.movingLeft) {
    x -= 1;
  }
  if (this.movingRight) {
    x += 1;
  }

  this.direction.set(x, 0);
};

Player.prototype.moveRight = function(enable) {
  this.movingRight = enable;
  this.updateDirection();
};

Player.prototype.moveLeft = function(enable) {
  this.movingLeft = enable;
  this.updateDirection();
};

Player.prototype.fire = function() {
  let playerProjectileCount = 0;

  const projectiles = game.projectiles();
  for (let i = projectiles.length - 1; i >= 0; i--) {
    if (projectiles[i].type === "player") {
      playerProjectileCount++;
    }
  }

  if (playerProjectileCount === 0) {
    const proj = game.projectilePool().take();
    proj.position.set(this.position.x, this.position.y);
    proj.speed = 180;
    proj.direction.set(0, -1);
    proj.type = "player";

    game.addEntity(proj);
  }
};

Player.prototype.update = function(dt) {
  Entity.prototype.update.call(this, dt);
};

export default Player;
