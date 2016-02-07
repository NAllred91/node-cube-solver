'use strict';

var constants = require('../node-cube-model').constants,
	_ = require('underscore');

exports.applyMoves = function(cube, moves)
{
	_.each(moves, function(move)
	{
		if(_.isArray(move))
		{
			cube.rotateFace(move[0], move[1]);
		}
		else if(_.isString(move))
		{
			cube[move]();
		}
		else
		{
			throw new Error("Invalid move. " + move);
		}
	});
};

exports.getPieceLocation = function(cube, piece)
{
	piece.sort();
	var cubeArray = cube.getFacesArray();

	var location = _.find(constants.PIECELOCATIONS, function(pieceLocation)
	{
		var valuesOnCube = _.map(pieceLocation, function(sticker)
		{
			return cubeArray[sticker[0]][sticker[1]];
		});

		return _.isEqual(valuesOnCube.sort(), piece);
	});

	if(!location)
	{
		throw new Error("Piece was not found on the cube!");
	}

	return location;
};