'use strict';

var constants = require('node-cube-model').constants,
    utility = require('../../utility'),
    topLayerAlgorithms = require('./Algorithms/TopLayer'),
    _ = require('underscore');

module.exports = function (cube) {
    var positionTopLeftCorner = function () {
        var cubeArray = cube.getFacesArray();
        var piece = utility.getPiece(cube, [0, 1, 4]);
        var faces = _.map(piece, function (sticker) {
            return sticker[0];
        });

        var topFaceColor = utility.getFaceColor(cube, constants.FACES.TOP);

        var topColorSticker = _.find(piece, function (sticker) {
            return sticker[2] === topFaceColor;
        });

        var algorithmToUse = '';

        if (_.contains(faces, constants.FACES.TOP)) {
            algorithmToUse = '0' + topColorSticker[1] + topColorSticker[0];
        }
        else {
            algorithmToUse = '5' + topColorSticker[1] + topColorSticker[0];
        }

        utility.applyMoves(cube, topLayerAlgorithms[algorithmToUse]);
    };

    var positionTopBackEdge = function () {
        var cubeArray = cube.getFacesArray();
        var piece = utility.getPiece(cube, [0, 4]);
        var faces = _.map(piece, function (sticker) {
            return sticker[0];
        });

        var topFaceColor = utility.getFaceColor(cube, constants.FACES.TOP);

        var topColorSticker = _.find(piece, function (sticker) {
            return sticker[2] === topFaceColor;
        });

        var algorithmToUse = '' + topColorSticker[0] + topColorSticker[1];

        utility.applyMoves(cube, topLayerAlgorithms[algorithmToUse], algorithmToUse);
    };

    _.times(4, function () {
        positionTopLeftCorner();
        positionTopBackEdge();
        cube.rotateCube(constants.CUBEROTATIONS.CW);
    });
};