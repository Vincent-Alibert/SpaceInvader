"use strict";
import playerActions from "./playerActions.js";
//
// Touch
//
export function getRelativeTouchCoords(touch) {
  function getOffsetLeft(elem) {
    let offsetLeft = 0;
    do {
      if (!isNaN(elem.offsetLeft)) {
        offsetLeft += elem.offsetLeft;
      }
    } while ((elem = elem.offsetParent));
    return offsetLeft;
  }

  function getOffsetTop(elem) {
    let offsetTop = 0;
    do {
      if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop;
      }
    } while ((elem = elem.offsetParent));
    return offsetTop;
  }

  const scale = game.gameFieldRect().width / canvas.clientWidth;
  const x = touch.pageX - getOffsetLeft(canvas);
  const y = touch.pageY - getOffsetTop(canvas);

  return { x: x * scale, y: y * scale };
}

export function touchStart(e) {
  const touches = e.changedTouches;
  let touchLocation, playerAction;

  e.preventDefault();

  for (let i = touches.length - 1; i >= 0; i--) {
    touchLocation = getRelativeTouchCoords(touches[i]);

    if (touchLocation.x < game.gameFieldRect().width * (1 / 5)) {
      playerAction = "moveLeft";
    } else if (touchLocation.x < game.gameFieldRect().width * (4 / 5)) {
      playerAction = "fire";
    } else {
      playerAction = "moveRight";
    }

    playerActions.startAction(touches[i].identifier, playerAction);
  }
}

export function touchEnd(e) {
  const touches = e.changedTouches;
  e.preventDefault();

  for (let i = touches.length - 1; i >= 0; i--) {
    playerActions.endAction(touches[i].identifier);
  }
}
