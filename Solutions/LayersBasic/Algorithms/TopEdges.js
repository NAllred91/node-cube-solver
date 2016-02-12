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

exports[CW] = [];
exports[CCW] = [];

exports['flipBackAndRightEdges'] = [];