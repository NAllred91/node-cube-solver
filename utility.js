'use strict';

var constants = require('node-cube-model').constants,
    _ = require('underscore');

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

// TODO refactor so that a "piece" is an object instead of an array.
// currently, a piece is an array of stickers.  A sticker is an array [face its on, position on face, color]
var getPiece = function(cube, faces) {
    var faceColors = _.map(faces, function(face) {
        return getFaceColor(cube, face);
    });

    faceColors.sort();
    var cubeArray = cube.getFacesArray();

    var location = _.find(constants.PIECELOCATIONS, function(pieceLocation) {
        var pieceColors = _.map(pieceLocation, function(sticker) {
            return cubeArray[sticker[0]][sticker[1]];
        });

        return _.isEqual(pieceColors.sort(), faceColors);
    });

    if(!location) {
        throw new Error("Piece was not found on the cube!");
    }

    return _.map(location, function(sticker) {
        var stickerColor = cubeArray[sticker[0]][sticker[1]];
        return sticker.concat(stickerColor);
    });
};

var getFaceColor = function(cube, face) {

    // The center piece on a face
    // is the color of the face.
    return cube.getFacesArray()[face][4];
};

module.exports = {
    applyMoves: applyMoves,
    getPiece: getPiece,
    getFaceColor: getFaceColor
};