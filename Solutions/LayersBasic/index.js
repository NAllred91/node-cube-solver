'use strict';
var solveTop = require('./solveTop'),
	solveMiddle = require('./solveMiddle');

module.exports = function(cube)
{
	solveTop(cube);
	solveMiddle(cube);
};