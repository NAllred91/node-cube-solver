'use strict';
var constants = require('node-cube-model').constants,
    validation = require('./validation'),
    solveTop = require('./solveTop'),
    solveMiddle = require('./solveMiddle'),
    solveTopCorners = require('./solveTopCorners');

module.exports = function (cube) {
    solveTop(cube);
    validation.validateTopSolved(cube);
    solveMiddle(cube);
    validation.validateMiddleSolved(cube);
    cube.rotateCube(constants.CUBEROTATIONS.BACK);
    cube.rotateCube(constants.CUBEROTATIONS.BACK);
    solveTopCorners(cube);
    cube.rotateCube(constants.CUBEROTATIONS.BACK);
    cube.rotateCube(constants.CUBEROTATIONS.BACK);
    validation.validateBottomCornersSolved(cube);
};