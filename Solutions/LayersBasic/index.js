'use strict';
var validation = require('./validation'),
	solveTop = require('./solveTop'),
	solveMiddle = require('./solveMiddle');

module.exports = function(cube)
{
	solveTop(cube);
	validation.validateTopSolved(cube);
	solveMiddle(cube);
};