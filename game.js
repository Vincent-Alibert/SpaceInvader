"use strict";
import game from "./Game/Game.js";
import { keyDown, keyUp } from "./Game/Keyboard.js";
import { touchStart, touchEnd } from "./Game/Touch.js";

const canvas = document.getElementById("game-layer");

document.body.addEventListener("keydown", keyDown, { passive: false });
document.body.addEventListener("keyup", keyUp, { passive: false });
canvas.addEventListener("touchstart", touchStart, { passive: false });
canvas.addEventListener("touchend", touchEnd, { passive: false });
canvas.addEventListener("touchcancel", touchEnd, { passive: false });

game.start();
