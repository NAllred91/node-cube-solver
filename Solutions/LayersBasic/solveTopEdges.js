'use strict';

const   constants = require('node-cube-model').constants,
        FACES = constants.FACES;

var utility = require('../../utility'),
    topEdgeAlgorithms = require('./Algorithms/TopEdges'),
    _ = require('underscore');


var testUtility = require('../../Tests/testUtilities')

var getTopEdgePieces = function(cube) {
    var topEdgePieceFaces = [
        [FACES.TOP, FACES.BACK],
        [FACES.TOP, FACES.RIGHT],
        [FACES.TOP, FACES.FRONT],
        [FACES.TOP, FACES.LEFT]
    ];
    // Map the array of faces to an array of pieces.
    return _.map(topEdgePieceFaces, function(faces) {
        var piece = cube.getPieceByCurrentLocation(faces);
        return piece;
    });
};

var orientTopEdges = function(cube) {
    var topFaceColor = cube.getFaceColor(FACES.TOP);

    // Get the top edge pieces.
    var topEdgePieces = getTopEdgePieces(cube);

    // Determine if each of the pieces is oriented correctly.
    var orientedCorrectly = _.map(topEdgePieces, function(piece) {
        return piece.getStickerOnFace(FACES.TOP).color === topFaceColor;
    });

    // If all the pieces are oriented correctly, we're done!
    if(!_.contains(orientedCorrectly, false)) {
        return;
    }

    var orientationCounts = _.countBy(orientedCorrectly, function(isOriented) {
        return isOriented;
    });

    // If an odd number of pieces are oriented correctly, the cube is invalid.
    if(orientationCounts.true && orientationCounts.true % 2 !== 0) {
        throw new Error("Invalid orientations");
    }

    // If all pieces are oriented incorrectly, all we can do is flip the
    // back and right edges.
    if(orientationCounts.false === 4) {
        utility.applyMoves(cube, topEdgeAlgorithms['flipBackAndRightEdges']);
        orientTopEdges(cube);
        return;
    }

    // If two opposite pieces are oriented correctly,
    // the pieces need to be swapped around first.
    if((orientedCorrectly[0] && orientedCorrectly[2])
        || orientedCorrectly[1] && orientedCorrectly[3]) {

        // If the right piece is oriented correctly,
        // rotate the cube counter clockwise.
        if(orientedCorrectly[1]) {
            cube.rotateCube(constants.CUBEROTATIONS.CW);
        }

        utility.applyMoves(cube, topEdgeAlgorithms['clockWise']);
        orientTopEdges(cube);
        return;
    }


    // Get the two incorrectly oriented pieces in the
    // back and right positions.
    if(!orientedCorrectly[1] && !orientedCorrectly[2]) {
        cube.rotateCube(constants.CUBEROTATIONS.CCW);
    }

    if(!orientedCorrectly[2] && !orientedCorrectly[3]) {
        cube.rotateCube(constants.CUBEROTATIONS.CCW);
        cube.rotateCube(constants.CUBEROTATIONS.CCW);
    }

    if(!orientedCorrectly[3] && !orientedCorrectly[0]) {
        cube.rotateCube(constants.CUBEROTATIONS.CW);
    }

    utility.applyMoves(cube, topEdgeAlgorithms['flipBackAndRightEdges']);
};

var positionTopEdges = function(cube) {

    var topEdgePieces = getTopEdgePieces(cube);
    var topFaceColor = cube.getFaceColor(FACES.TOP);

    var positionedCorrectly = _.map(topEdgePieces, function(piece) {
        var stickers = piece.stickers;
        var sideSticker = _.find(stickers, function(sticker) {
            return sticker.color !== topFaceColor;
        });
        return sideSticker.color === cube.getFaceColor(sideSticker.face);
    });

    // If all the pieces are positioned correctly, we're done!
    if(!_.contains(positionedCorrectly, false)) {
        return;
    }

    var positionCounts = _.countBy(positionedCorrectly, function(isPositioned) {
        return isPositioned;
    });

    // If 1 or 2 of the pieces aren't positioned incorrectly, the cube is invalid.
    if(positionCounts.false === 1 || positionCounts.false === 2) {
        throw new Error("Invalid orientations");
    }


    // If none of the pieces are positioned correctly, any rotation will get us close.
    if(!_.contains(positionedCorrectly, true)) {
        utility.applyMoves(cube, topEdgeAlgorithms['clockWise']);
        positionTopEdges(cube);
        return;
    }

    // At this point, only 1 piece should be correctly positioned.
    if(positionedCorrectly[0]) {
        cube.rotateCube(constants.CUBEROTATIONS.CCW);
    }

    if(positionedCorrectly[1]) {
        cube.rotateCube(constants.CUBEROTATIONS.CCW);
        cube.rotateCube(constants.CUBEROTATIONS.CCW);
    }

    if(positionedCorrectly[2]) {
        cube.rotateCube(constants.CUBEROTATIONS.CW);
    }

    // Get the top edge pieces again, since the cube may have been rotated.
    topEdgePieces = getTopEdgePieces(cube);

    var backEdgePiece = topEdgePieces[0];

    if(backEdgePiece.getStickerOnFace(FACES.BACK).color === cube.getFaceColor(FACES.RIGHT)) {
        utility.applyMoves(cube, topEdgeAlgorithms['clockWise']);
    }
    else {
        utility.applyMoves(cube, topEdgeAlgorithms['counterClockWise']);
    }
};

module.exports = function(cube) {
    orientTopEdges(cube);
    positionTopEdges(cube);
};