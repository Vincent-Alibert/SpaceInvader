"use strict";
import playerActions from "./playerActions.js";
//
// Keyboard
//
const keybinds = { 32: "fire", 37: "moveLeft", 39: "moveRight" };

export function keyDown(e) {
  const x = e.which || e.keyCode; // which or keyCode depends on browser support

  if (keybinds[x] !== undefined) {
    e.preventDefault();
    playerActions.startAction(x, keybinds[x]);
  }
}

export function keyUp(e) {
  const x = e.which || e.keyCode;

  if (keybinds[x] !== undefined) {
    e.preventDefault();
    playerActions.endAction(x);
  }
}
