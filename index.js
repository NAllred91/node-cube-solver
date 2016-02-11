'use strict';

var solutions = require('./Solutions'),
    cubeModel = require('node-cube-model');

exports.solve = function(cube, solutionName)
{
    var solution = solutions.getSolution(solutionName);
    var modelCube = cubeModel.create(cube);
    solution(modelCube);
    return modelCube;
};