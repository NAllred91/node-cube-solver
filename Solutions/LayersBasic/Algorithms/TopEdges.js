'use strict';

const   constants = require('node-cube-model').constants,
        TOP = constants.FACES.TOP,
        LEFT = constants.FACES.LEFT,
        FRONT = constants.FACES.FRONT,
        RIGHT = constants.FACES.RIGHT,
        BACK = constants.FACES.BACK,
        CW = constants.FACEROTATIONS.CW,
        CCW = constants.FACEROTATIONS.CCW,
        ROTATECUBEBACK = constants.CUBEROTATIONS.BACK,
        ROTATECUBEFORWARD = constants.CUBEROTATIONS.FORWARD;

// Rotate positions 1, 5, and 7 of the top face clockwise or counter clockwise.
exports['clockWise'] = [[RIGHT, CW], [RIGHT, CW], [TOP, CW], [FRONT, CW], [BACK, CCW], [RIGHT, CW], [RIGHT, CW], [BACK, CW], [FRONT, CCW], [TOP, CW], [RIGHT, CW], [RIGHT, CW]];
exports['counterClockWise'] = [[RIGHT, CW], [RIGHT, CW], [TOP, CCW], [FRONT, CW], [BACK, CCW], [RIGHT, CW], [RIGHT, CW], [BACK, CW], [FRONT, CCW], [TOP, CCW], [RIGHT, CW], [RIGHT, CW]];

// Flip positions 1 and 5 of the top face.
exports['flipBackAndRightEdges'] = [[LEFT, CW], [RIGHT, CCW], ROTATECUBEBACK, [TOP, CCW], [LEFT, CCW], [RIGHT, CW], ROTATECUBEFORWARD, [TOP, CW], [TOP, CW], [LEFT,CW], [RIGHT, CCW], ROTATECUBEBACK, [TOP, CCW], [LEFT, CCW], [RIGHT, CW], ROTATECUBEFORWARD];