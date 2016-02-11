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
 These algorithms are used to position the described
 corner piece in the top left corner of the cube.
 the first character indicates if the piece is currently located at the
 top or bottom.  The second character indicates the corner top color face is in.
 The third character indicates what face the top color is on.
 **/
exports[TOP + '0' + TOP] = []; // Nothing to do here, the piece is already correctly positioned!
exports[TOP + '0' + LEFT] = [[LEFT, CCW], [BOTTOM, CCW], [LEFT, CW], [BOTTOM, CW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[TOP + '2' + BACK] = [[BACK, CW], [BOTTOM, CW], [BACK, CCW], [BOTTOM, CCW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[TOP + '0' + BACK] = [[BACK, CCW], [BOTTOM, CCW], [BOTTOM, CCW], [BACK, CW], [BACK, CW], [BOTTOM, CCW], [BACK, CCW]];
exports[TOP + '2' + RIGHT] = [[RIGHT, CW], [BOTTOM, CW], [RIGHT, CCW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[TOP + '2' + TOP] = [[RIGHT, CW], [BOTTOM, CW], [RIGHT, CCW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[TOP + '2' + LEFT] = [[FRONT, CCW], [BOTTOM, CCW], [FRONT, CW], [LEFT, CCW], [BOTTOM, CCW], [BOTTOM, CCW], [LEFT, CW], [BOTTOM, CW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[TOP + '0' + FRONT] = [[FRONT, CCW], [BOTTOM, CCW], [FRONT, CW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[TOP + '6' + TOP] = [[FRONT, CCW], [BOTTOM, CCW], [FRONT, CW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[TOP + '2' + FRONT] = [[RIGHT, CCW], [BOTTOM, CW], [RIGHT, CW], [LEFT, CCW], [BOTTOM, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[TOP + '0' + RIGHT] = [[RIGHT, CCW], [BOTTOM, CCW], [RIGHT, CW], [BOTTOM, CCW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[TOP + '8' + TOP] = [[RIGHT, CCW], [LEFT, CCW], [BOTTOM, CW], [BOTTOM, CW], [RIGHT, CW], [LEFT, CW]];

exports[BOTTOM + '8' + LEFT] = [[BOTTOM, CCW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[BOTTOM + '6' + FRONT] = [[BOTTOM, CCW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[BOTTOM + '0' + BOTTOM] = [[BOTTOM, CCW], [LEFT, CCW], [BOTTOM, CCW], [BOTTOM, CCW], [LEFT, CW], [BOTTOM, CW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[BOTTOM + '8' + FRONT] = [[BOTTOM, CCW], [BOTTOM, CCW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[BOTTOM + '6' + RIGHT] = [[BOTTOM, CCW], [BOTTOM, CCW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[BOTTOM + '2' + BOTTOM] = [[BOTTOM, CCW], [BOTTOM, CCW], [LEFT, CCW], [BOTTOM, CCW], [BOTTOM, CCW], [LEFT, CW], [BOTTOM, CW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[BOTTOM + '8' + BACK] = [[BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[BOTTOM + '6' + LEFT] = [[LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[BOTTOM + '6' + BOTTOM] = [[LEFT, CCW], [BOTTOM, CCW], [BOTTOM, CCW], [LEFT, CW], [BOTTOM, CW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[BOTTOM + '6' + BACK] = [[BOTTOM, CW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];
exports[BOTTOM + '8' + RIGHT] = [[BOTTOM, CW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[BOTTOM + '8' + BOTTOM] = [[BOTTOM, CW], [LEFT, CCW], [BOTTOM, CCW], [BOTTOM, CCW], [LEFT, CW], [BOTTOM, CW], [LEFT, CCW], [BOTTOM, CCW], [LEFT, CW]];


/**
 These algorithms are used to position the described
 edge piece in the top back edge of the cube.
 The first character indicates what face the top color is on.
 The second character indicates the position on that face.
 **/

exports[TOP + '1'] = []; // Nothing to do here, the piece is already correctly positioned!
exports[TOP + '3'] = [[FRONT, CW], [BACK, CCW], [LEFT, CCW], [BACK, CW], [FRONT, CCW], [BOTTOM, CW], [LEFT, CW], [RIGHT, CCW], [BACK, CCW], [LEFT, CCW], [RIGHT, CW]];
exports[TOP + '5'] = [[FRONT, CCW], [BACK, CW], [RIGHT, CCW], [FRONT, CW], [BACK, CCW], [BOTTOM, CCW], [LEFT, CW], [RIGHT, CCW], [BACK, CCW], [LEFT, CCW], [RIGHT, CW]];
exports[TOP + '7'] = [[LEFT, CCW], [RIGHT, CW], [FRONT, CCW], [LEFT, CW], [RIGHT, CCW], [LEFT, CW], [RIGHT, CCW], [BACK, CCW], [LEFT, CCW], [RIGHT, CW]];
exports[LEFT + '1'] = [[LEFT, CCW], [TOP, CCW], [BOTTOM, CW], [FRONT, CW], [TOP, CW], /**NOW WE ARE AT LEFT 3**/[RIGHT, CCW], [BACK, CCW], [RIGHT, CW], [LEFT, CCW], [BOTTOM, CW], [LEFT, CW]];
exports[LEFT + '3'] = [[RIGHT, CCW], [BACK, CCW], [RIGHT, CW], [LEFT, CCW], [BOTTOM, CW], [LEFT, CW]];
exports[LEFT + '5'] = [[TOP, CW], [TOP, CW], ROTATECUBECCW, ROTATECUBECCW, /**NOW WE ARE AT RIGHT 5**/[BACK, CW], [LEFT, CCW], [RIGHT, CW], [BOTTOM, CCW], [LEFT, CW], [RIGHT, CCW], ROTATECUBECCW, ROTATECUBECCW, [TOP, CW], [TOP, CW]];
exports[LEFT + '7'] = [[BOTTOM, CCW], /**NOW WE ARE AT BACK 7**/[BACK, CW], [TOP, CW], [BOTTOM, CCW], [RIGHT, CCW], [TOP, CCW]];
exports[FRONT + '1'] = [[RIGHT, CW], [LEFT, CCW], [FRONT, CCW], [RIGHT, CCW], [LEFT, CW], [BOTTOM, CCW], /**WE ARE NOW AT BOTTOM 7**/[RIGHT, CCW], [BACK, CCW], [BACK, CCW], [RIGHT, CW], [BOTTOM, CCW], [BOTTOM, CCW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[FRONT + '3'] = [[TOP, CCW], ROTATECUBECW, /**NOW WE ARE AT LEFT 3**/[RIGHT, CCW], [BACK, CCW], [RIGHT, CW], [LEFT, CCW], [BOTTOM, CW], [LEFT, CW], ROTATECUBECCW, [TOP, CW]];
exports[FRONT + '5'] = [[TOP, CW], ROTATECUBECCW, /**NOW WE ARE AT RIGHT 5**/[BACK, CW], [LEFT, CCW], [RIGHT, CW], [BOTTOM, CCW], [LEFT, CW], [RIGHT, CCW], ROTATECUBECW, [TOP, CCW]];
exports[FRONT + '7'] = [[BOTTOM, CW], [BOTTOM, CW], /**NOW WE ARE AT BACK 7**/[BACK, CW], [TOP, CW], [BOTTOM, CCW], [RIGHT, CCW], [TOP, CCW]];
exports[RIGHT + '1'] = [[FRONT, CCW], [BACK, CW], [RIGHT, CW], [BACK, CCW], [FRONT, CW], /**WE ARE NOW AT BOTTOM 7**/[RIGHT, CCW], [BACK, CCW], [BACK, CCW], [RIGHT, CW], [BOTTOM, CCW], [BOTTOM, CCW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[RIGHT + '3'] = [[TOP, CCW], [TOP, CCW], ROTATECUBECCW, ROTATECUBECCW, /**NOW WE ARE AT LEFT 3**/[RIGHT, CCW], [BACK, CCW], [RIGHT, CW], [LEFT, CCW], [BOTTOM, CW], [LEFT, CW], ROTATECUBECCW, ROTATECUBECCW, [TOP, CCW], [TOP, CCW]];
exports[RIGHT + '5'] = [[BACK, CW], [LEFT, CCW], [RIGHT, CW], [BOTTOM, CCW], [LEFT, CW], [RIGHT, CCW]];
exports[RIGHT + '7'] = [[BOTTOM, CW], /**NOW WE ARE AT BACK 7**/[BACK, CW], [TOP, CW], [BOTTOM, CCW], [RIGHT, CCW], [TOP, CCW]];
exports[BACK + '1'] = [[BACK, CW], [TOP, CW], [BOTTOM, CCW], [RIGHT, CCW], [TOP, CCW], /**WE ARE NOW AT BACK 5**/[TOP, CCW], ROTATECUBECW, /**NOW WE ARE AT RIGHT 5**/[BACK, CW], [LEFT, CCW], [RIGHT, CW], [BOTTOM, CCW], [LEFT, CW], [RIGHT, CCW], ROTATECUBECCW, [TOP, CW]];
exports[BACK + '3'] = [[TOP, CW], ROTATECUBECCW, /**NOW WE ARE AT LEFT 3**/[RIGHT, CCW], [BACK, CCW], [RIGHT, CW], [LEFT, CCW], [BOTTOM, CW], [LEFT, CW], ROTATECUBECW, [TOP, CCW]];
exports[BACK + '5'] = [[TOP, CCW], ROTATECUBECW, /**NOW WE ARE AT RIGHT 5**/[BACK, CW], [LEFT, CCW], [RIGHT, CW], [BOTTOM, CCW], [LEFT, CW], [RIGHT, CCW], ROTATECUBECCW, [TOP, CW]];
exports[BACK + '7'] = [[BACK, CW], [TOP, CW], [BOTTOM, CCW], [RIGHT, CCW], [TOP, CCW]];
exports[BOTTOM + '1'] = [[BOTTOM, CW], [BOTTOM, CW], /**NOW WE ARE AT BOTTOM 7**/[RIGHT, CCW], [BACK, CCW], [BACK, CCW], [RIGHT, CW], [BOTTOM, CCW], [BOTTOM, CCW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[BOTTOM + '3'] = [[BOTTOM, CCW], /**NOW WE ARE AT BOTTOM 7**/[RIGHT, CCW], [BACK, CCW], [BACK, CCW], [RIGHT, CW], [BOTTOM, CCW], [BOTTOM, CCW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[BOTTOM + '5'] = [[BOTTOM, CW], /**NOW WE ARE AT BOTTOM 7**/[RIGHT, CCW], [BACK, CCW], [BACK, CCW], [RIGHT, CW], [BOTTOM, CCW], [BOTTOM, CCW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];
exports[BOTTOM + '7'] = [[RIGHT, CCW], [BACK, CCW], [BACK, CCW], [RIGHT, CW], [BOTTOM, CCW], [BOTTOM, CCW], [BACK, CW], [BOTTOM, CW], [BACK, CCW]];



