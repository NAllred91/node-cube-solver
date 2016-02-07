'use strict';

var utility = require('../../utility'),
	topLayerAlgorithms = require('./Algorithms/TopLayer'),
	_ = require('underscore');

module.exports = function(cube)
{
	var algorithmsUsed = [];
	var positionTopLeftCorner = function()
	{
		var cubeArray = cube.getFacesArray();
		// TODO cubeArray[x][4] gives the center piece, so its like asking for the color of the face x.  Maybe utility?
		var location = utility.getPieceLocation(cube, [cubeArray[0][4], cubeArray[1][4], cubeArray[4][4]]);
		var faces = _.map(location, function(sticker)
		{
			return sticker[0];
		});

		var topColorSticker = _.find(location, function(sticker)
		{
			return cubeArray[sticker[0]][sticker[1]] === cubeArray[0][4];
		});

		var algorithmToUse = '';

		if(_.contains(faces, 0))
		{
			algorithmToUse = '0' + topColorSticker[1] + topColorSticker[0];
		}
		else
		{
			algorithmToUse = '5' + topColorSticker[1] + topColorSticker[0];
		}

		algorithmsUsed.push(algorithmToUse)

		utility.applyMoves(cube, topLayerAlgorithms[algorithmToUse]);
	};

	var positionTopBackEdge = function()
	{
		var cubeArray = cube.getFacesArray();
		// TODO cubeArray[x][4] gives the center piece, so its like asking for the color of the face x.  Maybe utility?
		var location = utility.getPieceLocation(cube, [cubeArray[0][4], cubeArray[4][4]]);

		var faces = _.map(location, function(sticker)
		{
			return sticker[0];
		});

		var topColorSticker = _.find(location, function(sticker)
		{
			return cubeArray[sticker[0]][sticker[1]] === cubeArray[0][4];
		});

		var algorithmToUse = '' + topColorSticker[0] + topColorSticker[1];

		algorithmsUsed.push(algorithmToUse);

		utility.applyMoves(cube, topLayerAlgorithms[algorithmToUse],algorithmToUse);
	};

	var validateTopSolved = function()
	{
		var cubeArray = cube.getFacesArray();

		if(_.uniq(cubeArray[0]).length !== 1)
		{
			var err = new Error("Invalid solution, top face is incorrect.");
			err.cube = cubeArray;
			err.algorithms = algorithmsUsed;
			throw err;
		}

		var sides = [cubeArray[1],cubeArray[2],cubeArray[3],cubeArray[4]];

		_.each(sides, function(side)
		{
			var center = side[4];
			if(side[0] !== center || side[1] !== center || side[2] !== center)
			{
				throw new Error("Invalid solution, side face is incorrect.");
			}
		});
	}

	positionTopLeftCorner();
	positionTopBackEdge();
	cube.ROTATECUBECW();
	positionTopLeftCorner();
	positionTopBackEdge();
	cube.ROTATECUBECW();
	positionTopLeftCorner();
	positionTopBackEdge();
	cube.ROTATECUBECW();
	positionTopLeftCorner();
	positionTopBackEdge();
	cube.ROTATECUBECW();
	validateTopSolved();
};