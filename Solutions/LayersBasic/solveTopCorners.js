'use strict';

var constants = require('node-cube-model').constants,
    FACES = constants.FACES,
    CUBEROTATIONS = constants.CUBEROTATIONS,
    utility = require('../../utility'),
    topCornerAlgorithms = require('./Algorithms/TopCorners'),
    _ = require('underscore');

module.exports = function (cube) {
    var positionCorners = function () {
        // the [0][1] should be replaced with finding the FACES.TOP sticker and getting its position on the face.
        var topCornerMap = _.invert({
            0: utility.getPiece(cube, [FACES.TOP, FACES.LEFT, FACES.BACK])[0][1],
            2: utility.getPiece(cube, [FACES.TOP, FACES.BACK, FACES.RIGHT])[0][1],
            8: utility.getPiece(cube, [FACES.TOP, FACES.RIGHT, FACES.FRONT])[0][1],
            6: utility.getPiece(cube, [FACES.TOP, FACES.FRONT, FACES.LEFT])[0][1]
        });

        topCornerMap[0] = parseInt(topCornerMap[0]);
        topCornerMap[2] = parseInt(topCornerMap[2]);
        topCornerMap[6] = parseInt(topCornerMap[6]);
        topCornerMap[8] = parseInt(topCornerMap[8]);

        var rotateCubeAndMap = function (cube, map) {
            cube.rotateCube(CUBEROTATIONS.CW);
            var temp = topCornerMap[0];
            topCornerMap[0] = topCornerMap[6];
            topCornerMap[6] = topCornerMap[8];
            topCornerMap[8] = topCornerMap[2];
            topCornerMap[2] = temp;
        };

        var valueToGetToZero;
        var algorithmToUse;
        var shouldRepeat = false;
        var matchFound = false;

        while (!matchFound) {
            rotateCubeAndMap(cube, topCornerMap);

            // Determine what map this map matches.
            if (_.isEqual(topCornerMap, {0: 0, 2: 2, 8: 8, 6: 6})) {
                // Nothing to do
                matchFound = true;
            }
            else if (_.isEqual(topCornerMap, {0: 0, 2: 2, 8: 6, 6: 8})) {
                valueToGetToZero = 6;
                algorithmToUse = 'flipBackCorners';
                matchFound = true;
            }
            else if (_.isEqual(topCornerMap, {0: 0, 2: 6, 8: 2, 6: 8})) {
                algorithmToUse = 'flipBackCorners';
                shouldRepeat = true;
                matchFound = true;
            }
            else if (_.isEqual(topCornerMap, {0: 0, 2: 6, 8: 8, 6: 2})) {
                valueToGetToZero = 0;
                algorithmToUse = 'flipBackAndFrontCorners';
                matchFound = true;
            }
            else if (_.isEqual(topCornerMap, {0: 0, 2: 8, 8: 2, 6: 6})) {
                valueToGetToZero = 8;
                algorithmToUse = 'flipBackCorners';
                matchFound = true;
            }
            else if (_.isEqual(topCornerMap, {0: 0, 2: 8, 8: 6, 6: 2})) {
                valueToGetToZero = 2;
                algorithmToUse = 'flipBackCorners';
                matchFound = true;
            }
        }

        if (_.isNumber(valueToGetToZero)) {
            var positioned = (topCornerMap[0] === valueToGetToZero);

            while (!positioned) {
                rotateCubeAndMap(cube, topCornerMap);
                positioned = (topCornerMap[0] === valueToGetToZero);
            }
        }

        if (algorithmToUse) {
            utility.applyMoves(cube, topCornerAlgorithms[algorithmToUse]);
        }

        if (shouldRepeat) {
            positionCorners();
        }
    };

    var positionTopFace = function () {
        var leftCornerPiece = utility.getPiece(cube, [FACES.TOP, FACES.LEFT, FACES.BACK]);
        var nonTopFaces = [];

        _.each(leftCornerPiece, function (sticker) {
            if (sticker[0] !== FACES.TOP) {
                nonTopFaces.push(sticker[0]);
            }
        });

        nonTopFaces.sort();

        if (_.isEqual(nonTopFaces, [FACES.LEFT, FACES.BACK].sort())) {
            // Nothing to do.
        }
        else if (_.isEqual(nonTopFaces, [FACES.BACK, FACES.RIGHT].sort())) {
            cube.rotateFace(FACES.TOP, constants.FACEROTATIONS.CCW);
        }
        else if (_.isEqual(nonTopFaces, [FACES.RIGHT, FACES.FRONT].sort())) {
            cube.rotateFace(FACES.TOP, constants.FACEROTATIONS.CCW);
            cube.rotateFace(FACES.TOP, constants.FACEROTATIONS.CCW);
        }
        else if (_.isEqual(nonTopFaces, [FACES.FRONT, FACES.LEFT].sort())) {
            cube.rotateFace(FACES.TOP, constants.FACEROTATIONS.CW);
        }
        else {
            throw new Error("Error Positioning Corners");
        }
    };

    var orientCorners = function () {
        // Since the corners have already been positioned, these corners
        // go clockwise starting at the 0 position of the top face.
        var cornerPieces = [
            utility.getPiece(cube, [FACES.TOP, FACES.LEFT, FACES.BACK]),
            utility.getPiece(cube, [FACES.TOP, FACES.BACK, FACES.RIGHT]),
            utility.getPiece(cube, [FACES.TOP, FACES.RIGHT, FACES.FRONT]),
            utility.getPiece(cube, [FACES.TOP, FACES.FRONT, FACES.LEFT])
        ];

        var topFaceColor = utility.getFaceColor(cube, FACES.TOP);

        // 1 is top, 0 is left side of side face, 2 is right side of side face.
        // TODO can't just assume that the first sticker in the array is the top...
        var topColorDirection = _.map(cornerPieces, function (piece) {
            var topSticker = _.find(piece, function (sticker) {
                return sticker[2] === topFaceColor;
            });

            if (topSticker[0] === FACES.TOP) {
                return 1;
            }
            return topSticker[1];
        });

        var checkIfCorrect = function (topColorDirection) {
            return _.isEqual(topColorDirection, [1, 1, 1, 1])
        };

        var checkIfOneOffFromCorrect = function (topColorDirection) {
            var counts = _.countBy(topColorDirection, function (direction) {
                return direction;
            });

            return counts['1'] === 1 && (counts['0'] === 3 || counts['2'] === 3);
        };

        var getCounterClockWiseRotation = function (topColorDirection) {
            return _.map(topColorDirection, function (direction, index) {
                if (index === 2) {
                    return direction;
                }

                return direction + 1 % 2;
            });
        };

        var getClockWiseRotation = function (topColorDirection) {
            return _.map(topColorDirection, function (direction, index) {
                if (index === 1) {
                    return direction;
                }

                direction = direction - 1;
                if (direction === -1) {
                    direction = 2
                }
                return direction;
            });
        };

        if (checkIfCorrect(topColorDirection)) {
            return;
        }

        if (checkIfCorrect(getClockWiseRotation(topColorDirection))) {
            utility.applyMoves(cube, topCornerAlgorithms['rotateCornersCW']);
            return;
        }

        if (checkIfCorrect(getCounterClockWiseRotation(topColorDirection))) {
            utility.applyMoves(cube, topCornerAlgorithms['rotateCornersCCW']);
            return;
        }

        if (checkIfOneOffFromCorrect(topColorDirection)) {
            cube.rotateCube(CUBEROTATIONS.CW);
            orientCorners();
            return;
        }

        if (checkIfOneOffFromCorrect(getClockWiseRotation(topColorDirection))) {
            utility.applyMoves(cube, topCornerAlgorithms['rotateCornersCW']);
            orientCorners();
            return;
        }
        ;

        if (checkIfOneOffFromCorrect(getCounterClockWiseRotation(topColorDirection))) {
            utility.applyMoves(cube, topCornerAlgorithms['rotateCornersCCW']);
            orientCorners();
            return;
        }
        ;

        cube.rotateCube(CUBEROTATIONS.CW);
        orientCorners();
    };

    positionCorners();
    positionTopFace();
    orientCorners();
};