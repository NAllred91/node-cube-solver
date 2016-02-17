'use strict';

const   constants = require('node-cube-model').constants,
        FACES = constants.FACES;

var utility = require('../../utility'),
    topLayerAlgorithms = require('./Algorithms/TopLayer'),
    _ = require('underscore');

module.exports = function(cube) {
    var positionTopLeftCorner = function() {
        var piece = cube.getPieceByDestinationLocation([FACES.TOP, FACES.LEFT, FACES.BACK]);

        var topFaceColor = cube.getFaceColor(constants.FACES.TOP);
        var topColorSticker = piece.getStickerOfColor(topFaceColor);

        var algorithmToUse = '';

        if(piece.getStickerOnFace(constants.FACES.TOP)) {
            algorithmToUse = '0' + topColorSticker.position + topColorSticker.face;
        }
        else {
            algorithmToUse = '5' + topColorSticker.position + topColorSticker.face;
        }

        utility.applyMoves(cube, topLayerAlgorithms[algorithmToUse]);
    };

    var positionTopBackEdge = function() {
        var piece = cube.getPieceByDestinationLocation([FACES.TOP, FACES.BACK]);

        var topFaceColor = cube.getFaceColor(constants.FACES.TOP);
        var topColorSticker = piece.getStickerOfColor(topFaceColor);

        var algorithmToUse = '' + topColorSticker.face + topColorSticker.position;

        utility.applyMoves(cube, topLayerAlgorithms[algorithmToUse], algorithmToUse);
    };

    _.times(4, function() {
        positionTopLeftCorner();
        positionTopBackEdge();
        cube.rotateCube(constants.CUBEROTATIONS.CW);
    });
};