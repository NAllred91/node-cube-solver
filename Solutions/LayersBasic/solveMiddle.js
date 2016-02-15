'use strict';

const   constants = require('node-cube-model').constants,
        FACES = constants.FACES;

var utility = require('../../utility'),
    middleLayerAlgorithms = require('./Algorithms/MiddleLayer'),
    _ = require('underscore');

module.exports = function(cube) {
    // Go through and position all the
    // pieces that are on the bottom row.
    // This may knock some pieces into the bottom
    // row that are currently in the wrong place
    // in the middle row.
    var solvePiecesOnBottom = function() {
        var solvedAtleastOnePiece;
        do {
            solvedAtleastOnePiece = false;
            _.times(4, function() {

                // Get the two pieces that belong in the middle for the front face.
                var piecesForThisFace = _.map([[FACES.LEFT, FACES.FRONT], [FACES.FRONT, FACES.RIGHT]], function(faces) {
                    return cube.getPiece(faces);
                });

                // Get the colors of the front, right, and left faces.
                var frontColor = cube.getFaceColor(constants.FACES.FRONT);
                var rightColor = cube.getFaceColor(constants.FACES.RIGHT);
                var leftColor = cube.getFaceColor(constants.FACES.LEFT);

                // Find a piece that is not currently in the correct position that
                // can be moved to the correct position.
                var pieceToSolve = _.find(piecesForThisFace, function(piece) {
                    // Get the sticker that is on the bottom face.
                    var stickerOnBottomFace = piece.getStickerOnFace(constants.FACES.BOTTOM);

                    // If there is a sticker on the bottom face and the color
                    // of that sticker isn't the front color, it can be solved.
                    if(stickerOnBottomFace && stickerOnBottomFace.color !== frontColor) {
                        return true;
                    }
                });


                if(pieceToSolve) {
                    solvedAtleastOnePiece = true;
                    var algorithmToUse;

                    // Get the two stickers of the piece.
                    var stickerOnBottomFace = pieceToSolve.getStickerOnFace(constants.FACES.BOTTOM);
                    var frontColoredSticker = pieceToSolve.getStickerOfColor(frontColor);

                    if(stickerOnBottomFace.color === rightColor) {
                        algorithmToUse = 'rightSide';
                    }
                    else if(stickerOnBottomFace.color === leftColor) {
                        algorithmToUse = 'leftSide';
                    }
                    else {
                        throw new Error("Error solving middle face.");
                    }

                    algorithmToUse += frontColoredSticker.face;

                    utility.applyMoves(cube, middleLayerAlgorithms[algorithmToUse]);
                }

                cube.rotateCube(constants.CUBEROTATIONS.CW);
            });
        } while(solvedAtleastOnePiece);

    };

    // Second time around we will have to
    // knock any incorrect middle row pieces to the
    // bottom with a random piece, then solve as normal.
    var displaceAnIncorrectlyOrientedPiece = function() {
        var pieceFaces = [
            [FACES.LEFT, FACES.FRONT],
            [FACES.FRONT, FACES.RIGHT],
            [FACES.RIGHT, FACES.BACK],
            [FACES.BACK, FACES.LEFT]
        ];

        var incorrectPieceFaces = _.find(pieceFaces, function(faces) {
            var piece = cube.getPiece(faces);
            var stickers = piece.stickers;

            if(cube.getFaceColor(stickers[0].face) !== stickers[0].color
                || cube.getFaceColor(stickers[1].face) !== stickers[1].color) {
                return true;
            }
        });

        if(!incorrectPieceFaces) {
            return false;
        }

        if(incorrectPieceFaces === pieceFaces[2]) {
            cube.rotateCube(constants.CUBEROTATIONS.CW);
        }
        if(incorrectPieceFaces === pieceFaces[3]) {
            cube.rotateCube(constants.CUBEROTATIONS.CCW);
        }

        if(incorrectPieceFaces === pieceFaces[2] || incorrectPieceFaces === pieceFaces[1]) {
            utility.applyMoves(cube, middleLayerAlgorithms['rightSide' + constants.FACES.LEFT]);
        }
        else {
            utility.applyMoves(cube, middleLayerAlgorithms['leftSide' + constants.FACES.RIGHT]);
        }

        return true;
    };

    var displacedAPiece;
    do {
        solvePiecesOnBottom();
        displacedAPiece = displaceAnIncorrectlyOrientedPiece();
    } while(displacedAPiece);
};