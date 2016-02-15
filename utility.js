'use strict';

var _ = require('underscore');

var applyMoves = function(cube, moves) {
    _.each(moves, function(move) {
        if(_.isArray(move)) {
            cube.rotateFace(move[0], move[1]);
        }
        else if(_.isString(move)) {
            cube.rotateCube(move);
        }
        else {
            throw new Error("Invalid move. " + move);
        }
    });
};

module.exports = {
    applyMoves: applyMoves
};