'use strict';

var fs = require('fs'),
	_ = require('underscore');

var SolutionManager = function()
{
	var self = this;
	var solutionNames = ['LayersBasic']
	self.solutions = {};

	_.each(solutionNames, function(solutionName)
	{
		self.solutions[solutionName] = require('./' + solutionName);
	});
};

SolutionManager.prototype.getSolutionNames = function()
{
	return _.keys(this.solutions);
};

SolutionManager.prototype.getSolution = function(solutionName)
{
	// Make an instance of that solution object and return it.
	return this.solutions[solutionName];
};

module.exports = function()
{
	return new SolutionManager();
}();