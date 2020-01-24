"use strict";
import game from "./Game.js";
//
// Player Actions
//
const playerActions = (function() {
  const _ongoingActions = [];

  function _startAction(id, playerAction) {
    if (playerAction === undefined) {
      return;
    }
    let f;
    const acts = {
      moveLeft: function() {
        if (game.player()) game.player().moveLeft(true);
      },
      moveRight: function() {
        if (game.player()) game.player().moveRight(true);
      },
      fire: function() {
        if (game.player()) game.player().fire();
      }
    };

    if ((f = acts[playerAction])) f();

    _ongoingActions.push({ identifier: id, playerAction: playerAction });
  }

  function _endAction(id) {
    let f;
    const acts = {
      moveLeft: function() {
        if (game.player()) game.player().moveLeft(false);
      },
      moveRight: function() {
        if (game.player()) game.player().moveRight(false);
      }
    };

    const idx = _ongoingActions.findIndex(function(a) {
      return a.identifier === id;
    });

    if (idx >= 0) {
      if ((f = acts[_ongoingActions[idx].playerAction])) f();
      _ongoingActions.splice(idx, 1); // remove action at idx
    }
  }

  return {
    startAction: _startAction,
    endAction: _endAction
  };
})();

export default playerActions;
