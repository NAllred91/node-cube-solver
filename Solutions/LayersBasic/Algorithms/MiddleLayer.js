'use strict';

var constants = require('node-cube-model').constants,
    TOP = constants.FACES.TOP,
    LEFT = constants.FACES.LEFT,
    FRONT = constants.FACES.FRONT,
    RIGHT = constants.FACES.RIGHT,
    BACK = constants.FACES.BACK,
    BOTTOM = constants.FACES.BOTTOM,
    CW = constants.FACEROTATIONS.CW,
    CCW = constants.FACEROTATIONS.CCW,
    ROTATECUBECCW = constants.CUBEROTATIONS.CCW,
    ROTATECUBECW = constants.CUBEROTATIONS.CW;

/**
These algorithms are used to take a piece from the
bottom row and position it on the "leftSide" or 
"rightSide" middle edge of the front face.  
The strings "leftSide" and "rightSide" indicate where
the piece should be moved to on the front face.  That is followed
by the name of the face that piece is currently on. These values
can only be FRONT, LEFT, RIGHT, and BACK.
**/
var rightFaceToLeftSide = [[LEFT,CW],[BOTTOM,CCW],[LEFT,CCW],[BOTTOM,CCW],[FRONT,CCW],[BOTTOM,CW],[FRONT,CW]];
var leftFaceToRightSide = [[RIGHT,CCW],[BOTTOM,CW],[RIGHT,CW],[BOTTOM,CW],[FRONT,CW],[BOTTOM,CCW],[FRONT,CCW]];

exports["leftSide" + FRONT] = [[BOTTOM,CW]].concat(rightFaceToLeftSide);
exports["rightSide" + FRONT] = [[BOTTOM,CCW]].concat(leftFaceToRightSide);
exports["leftSide" + LEFT] = [[BOTTOM,CCW],[BOTTOM,CCW]].concat(rightFaceToLeftSide);
exports["rightSide" + LEFT] = leftFaceToRightSide
exports["leftSide" + RIGHT] = rightFaceToLeftSide
exports["rightSide" + RIGHT] = [[BOTTOM,CCW],[BOTTOM,CCW]].concat(leftFaceToRightSide);
exports["leftSide" + BACK] = [[BOTTOM,CCW]].concat(rightFaceToLeftSide);
exports["rightSide" + BACK] = [[BOTTOM,CW]].concat(leftFaceToRightSide);