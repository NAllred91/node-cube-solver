'use strict';

const   constants = require('node-cube-model').constants,
        FACES = constants.FACES,
        CUBEROTATIONS = constants.CUBEROTATIONS;

var utility = require('../../utility'),
    topCornerAlgorithms = require('./Algorithms/TopCorners'),
    _ = require('underscore');

var positionCorners = function(cube) {

    // Create an object that maps the current position on the top face to the
    // position the piece should end up in.
    var topCornerMap = _.invert({
        0: cube.getPieceByDestinationLocation([FACES.TOP, FACES.LEFT, FACES.BACK]).getStickerOnFace(FACES.TOP).position,
        2: cube.getPieceByDestinationLocation([FACES.TOP, FACES.BACK, FACES.RIGHT]).getStickerOnFace(FACES.TOP).position,
        8: cube.getPieceByDestinationLocation([FACES.TOP, FACES.RIGHT, FACES.FRONT]).getStickerOnFace(FACES.TOP).position,
        6: cube.getPieceByDestinationLocation([FACES.TOP, FACES.FRONT, FACES.LEFT]).getStickerOnFace(FACES.TOP).position
    });

    topCornerMap[0] = parseInt(topCornerMap[0]);
    topCornerMap[2] = parseInt(topCornerMap[2]);
    topCornerMap[6] = parseInt(topCornerMap[6]);
    topCornerMap[8] = parseInt(topCornerMap[8]);

    var rotateCubeAndMap = function(cube, map) {
        cube.rotateCube(CUBEROTATIONS.CW);
        var temp = topCornerMap[0];
        map[0] = map[6];
        map[6] = map[8];
        map[8] = map[2];
        map[2] = temp;
    };

    var valueToGetToZero;
    var algorithmToUse;
    var shouldRepeat = false;
    var matchFound = false;

    while(!matchFound) {
        rotateCubeAndMap(cube, topCornerMap);

        // Determine what map this map matches.
        if(_.isEqual(topCornerMap, {0: 0, 2: 2, 8: 8, 6: 6})) {
            // Nothing to do
            matchFound = true;
        }
        else if(_.isEqual(topCornerMap, {0: 0, 2: 2, 8: 6, 6: 8})) {
            valueToGetToZero = 6;
            algorithmToUse = 'flipBackCorners';
            matchFound = true;
        }
        else if(_.isEqual(topCornerMap, {0: 0, 2: 6, 8: 2, 6: 8})) {
            algorithmToUse = 'flipBackCorners';
            shouldRepeat = true;
            matchFound = true;
        }
        else if(_.isEqual(topCornerMap, {0: 0, 2: 6, 8: 8, 6: 2})) {
            valueToGetToZero = 0;
            algorithmToUse = 'flipBackAndFrontCorners';
            matchFound = true;
        }
        else if(_.isEqual(topCornerMap, {0: 0, 2: 8, 8: 2, 6: 6})) {
            valueToGetToZero = 8;
            algorithmToUse = 'flipBackCorners';
            matchFound = true;
        }
        else if(_.isEqual(topCornerMap, {0: 0, 2: 8, 8: 6, 6: 2})) {
            valueToGetToZero = 2;
            algorithmToUse = 'flipBackCorners';
            matchFound = true;
        }
    }

    if(_.isNumber(valueToGetToZero)) {
        var positioned = (topCornerMap[0] === valueToGetToZero);

        while(!positioned) {
            rotateCubeAndMap(cube, topCornerMap);
            positioned = (topCornerMap[0] === valueToGetToZero);
        }
    }

    if(algorithmToUse) {
        utility.applyMoves(cube, topCornerAlgorithms[algorithmToUse]);
    }

    if(shouldRepeat) {
        positionCorners(cube);
    }
};

var positionTopFace = function(cube) {
    // Get the left corner piece.
    var leftCornerPiece = cube.getPieceByDestinationLocation([FACES.TOP, FACES.LEFT, FACES.BACK]);

    // Get the two stickers of that piece that are not the top colored sticker.
    var nonTopFaces = _.chain(leftCornerPiece.stickers)
    .map(function(sticker) {
        return sticker.face;
    })
    .reject(function(face) {
        return face === FACES.TOP;
    })
    .value();

    nonTopFaces.sort();

    if(_.isEqual(nonTopFaces, [FACES.LEFT, FACES.BACK].sort())) {
        // Nothing to do.
    }
    else if(_.isEqual(nonTopFaces, [FACES.BACK, FACES.RIGHT].sort())) {
        cube.rotateFace(FACES.TOP, constants.FACEROTATIONS.CCW);
    }
    else if(_.isEqual(nonTopFaces, [FACES.RIGHT, FACES.FRONT].sort())) {
        cube.rotateFace(FACES.TOP, constants.FACEROTATIONS.CCW);
        cube.rotateFace(FACES.TOP, constants.FACEROTATIONS.CCW);
    }
    else if(_.isEqual(nonTopFaces, [FACES.FRONT, FACES.LEFT].sort())) {
        cube.rotateFace(FACES.TOP, constants.FACEROTATIONS.CW);
    }
    else {
        throw new Error("Error Positioning Corners");
    }
};

var orientCorners = function(cube) {
    // Since the corners have already been positioned, these corners
    // go clockwise starting at the 0 position of the top face.
    var cornerPieces = [
        cube.getPieceByDestinationLocation([FACES.TOP, FACES.LEFT, FACES.BACK]),
        cube.getPieceByDestinationLocation([FACES.TOP, FACES.BACK, FACES.RIGHT]),
        cube.getPieceByDestinationLocation([FACES.TOP, FACES.RIGHT, FACES.FRONT]),
        cube.getPieceByDestinationLocation([FACES.TOP, FACES.FRONT, FACES.LEFT])
    ];

    var topFaceColor = cube.getFaceColor(FACES.TOP);

    // Determine how the piece is oriented.
    // 1 is the top color sticker is on top,
    // 0 is the top color sticker is on a side face in the 0 position,
    // 2 is top color sticker is on a side fance in the 2 position.
    var topColorDirection = _.map(cornerPieces, function(piece) {
        var topColoredSticker = piece.getStickerOfColor(topFaceColor);
        if(topColoredSticker.face === FACES.TOP) {
            return 1;
        }

        return topColoredSticker.position;
    });

    var checkIfCorrect = function(topColorDirection) {
        return _.isEqual(topColorDirection, [1, 1, 1, 1])
    };

    var checkIfOneOffFromCorrect = function(topColorDirection) {
        var counts = _.countBy(topColorDirection, function(direction) {
            return direction;
        });

        return counts['1'] === 1 && (counts['0'] === 3 || counts['2'] === 3);
    };

    var getCounterClockWiseRotation = function(topColorDirection) {
        return _.map(topColorDirection, function(direction, index) {
            if(index === 2) {
                return direction;
            }

            return direction + 1 % 2;
        });
    };

    var getClockWiseRotation = function(topColorDirection) {
        return _.map(topColorDirection, function(direction, index) {
            if(index === 1) {
                return direction;
            }

            direction = direction - 1;
            if(direction === -1) {
                direction = 2
            }
            return direction;
        });
    };

    if(checkIfCorrect(topColorDirection)) {
        return;
    }

    if(checkIfCorrect(getClockWiseRotation(topColorDirection))) {
        utility.applyMoves(cube, topCornerAlgorithms['rotateCornersCW']);
        return;
    }

    if(checkIfCorrect(getCounterClockWiseRotation(topColorDirection))) {
        utility.applyMoves(cube, topCornerAlgorithms['rotateCornersCCW']);
        return;
    }

    if(checkIfOneOffFromCorrect(topColorDirection)) {
        cube.rotateCube(CUBEROTATIONS.CW);
        orientCorners(cube);
        return;
    }

    if(checkIfOneOffFromCorrect(getClockWiseRotation(topColorDirection))) {
        utility.applyMoves(cube, topCornerAlgorithms['rotateCornersCW']);
        orientCorners(cube);
        return;
    }

    if(checkIfOneOffFromCorrect(getCounterClockWiseRotation(topColorDirection))) {
        utility.applyMoves(cube, topCornerAlgorithms['rotateCornersCCW']);
        orientCorners(cube);
        return;
    }

    cube.rotateCube(CUBEROTATIONS.CW);
    orientCorners(cube);
};

module.exports = function(cube) {

    positionCorners(cube);
    positionTopFace(cube);
    orientCorners(cube);
};