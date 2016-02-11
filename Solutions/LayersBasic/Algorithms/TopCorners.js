/**
 key: position on top face.
 value: the piece that is currently in that spot.

 values can be rotated cw 0 -> 2 -> 8 -> 6 -> 0

 // Solved by getting key 0 to have value 2, then flip the back corners.
 {
     0:0,
     2:8,
     8:6,
     6:2
 }

 // Solved by gettinkg key 0 to have value 8, then flip the back two corners.
 {
     0:0,
     2:8,
     8:2,
     6:6
 }

 // Solved by getting key 0 to have value 0, then flip front and back two corners.
 {
     0:0,
     2:6,
     8:8,
     6:2
 }

 // Flip back corners and try again
 {
     0:0,
     2:6,
     8:2,
     6:8
 }

 // Solved by gettinkg key 0 to have value 6, then flip the back two corners.
 {
     0:0,
     2:2,
     8:6,
     6:8
 }

 // Solved
 {
     0:0,
     2:2,
     8:8,
     6:6
 }
 **/

var constants = require('node-cube-model').constants,
    TOP = constants.FACES.TOP,
    LEFT = constants.FACES.LEFT,
    FRONT = constants.FACES.FRONT,
    CW = constants.FACEROTATIONS.CW,
    CCW = constants.FACEROTATIONS.CCW;

exports['flipBackCorners'] = [[LEFT, CCW], [TOP, CCW], [LEFT, CW], [FRONT, CW], [TOP, CCW], [FRONT, CCW], [LEFT, CCW], [TOP, CW], [LEFT, CW]];
exports['flipBackAndFrontCorners'] = [[LEFT, CCW], [TOP, CCW], [LEFT, CW], [FRONT, CW], [TOP, CCW], [TOP, CCW], [FRONT, CCW], [LEFT, CCW], [TOP, CW], [LEFT, CW]];
// Rotates all corners except the one in the 8 position.
// TODO the final two top rotations in these algorithms could be made unnecessary.
exports['rotateCornersCW'] = [[LEFT, CW], [TOP, CW], [LEFT, CCW], [TOP, CW], [LEFT, CW], [TOP, CCW], [TOP, CCW], [LEFT, CCW], [TOP, CCW], [TOP, CCW]];
exports['rotateCornersCCW'] = [[LEFT, CCW], [TOP, CCW], [LEFT, CW], [TOP, CCW], [LEFT, CCW], [TOP, CCW], [TOP, CCW], [LEFT, CW], [TOP, CCW], [TOP, CCW]];




