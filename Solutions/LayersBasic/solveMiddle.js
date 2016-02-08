'use strict';

var constants = require('node-cube-model').constants,
	utility = require('../../utility'),
	middleLayerAlgorithms = require('./Algorithms/MiddleLayer'),
	_ = require('underscore');

	var testUtility = require('../../Tests/testUtilities');

module.exports = function(cube)
{

	var bottomFaceColor = utility.getFaceColor(cube, constants.FACES.BOTTOM);

	// Go through and position all the
	// pieces that are on the bottom row.
	// This may knock some pieces into the bottom
	// row that are currently in the wrong place
	// in the middle row.
	var solvePiecesOnBottom = function()
	{
		// TODO weird logic...
		var solvedAtleastOnePiece = true;
		while(solvedAtleastOnePiece)
		{
			solvedAtleastOnePiece = false;
			_.times(4, function()
			{
				var piecesForThisFace = _.map([[1,2],[2,3]], function(faces)
				{
					return utility.getPiece(cube, faces);
				});

				var frontColor = utility.getFaceColor(cube, constants.FACES.FRONT);
				var rightColor = utility.getFaceColor(cube, constants.FACES.RIGHT);

				var pieceToSolve = _.find(piecesForThisFace, function(piece)
				{
					if(piece[0][0] === constants.FACES.BOTTOM)
					{
						if(piece[1][2] === frontColor)
						{
							return true;
						}
					}

					if(piece[1][0] === constants.FACES.BOTTOM)
					{
						if(piece[0][2] === frontColor)
						{
							return true;
						}
					}
				});
				if(pieceToSolve)
				{
					solvedAtleastOnePiece = true;
					var algorithmToUse;

					var notFrontColoredSticker = _.find(pieceToSolve, function(sticker)
					{
						return sticker[2] !== frontColor;
					});

					var frontColoredSticker = _.find(pieceToSolve, function(sticker)
					{
						return sticker[2] === frontColor;
					});

					if(notFrontColoredSticker[2] === rightColor)
					{
						algorithmToUse = 'rightSide';
					}
					else
					{
						algorithmToUse = 'leftSide';
					}

					algorithmToUse += frontColoredSticker[0];

					utility.applyMoves(cube, middleLayerAlgorithms[algorithmToUse]);
				}

				cube.rotateCube(constants.CUBEROTATIONS.CW);
				return;
			});
		}
		
	};

	// Second time around we will have to
	// knock any incorrect middle row pieces to the
	// bottom with a random piece, then solve as normal.
	var displaceAnIncorrectlyOrientedPiece = function()
	{
		var pieceFaces = [[1,2],[2,3],[3,4],[4,1]]
		var incorrectPiece = _.find(pieceFaces, function(faces)
		{
			var piece = utility.getPiece(cube, faces);
			if(utility.getFaceColor(cube, piece[0][0]) !== piece[0][2])
			{
				return true;
			}
		});

		if(!incorrectPiece)
		{
			return false;
		}

		if(incorrectPiece === pieceFaces[2])
		{
			cube.rotateCube(constants.CUBEROTATIONS.CW);
		}
		if(incorrectPiece === pieceFaces[3])
		{
			cube.rotateCube(constants.CUBEROTATIONS.CCW);
		}

		if(incorrectPiece === pieceFaces[2] || incorrectPiece === pieceFaces[1])
		{
			utility.applyMoves(cube, middleLayerAlgorithms['rightSide' + constants.FACES.LEFT]);
		}
		else
		{
			utility.applyMoves(cube, middleLayerAlgorithms['leftSide' + constants.FACES.RIGHT]);
		}
		testUtility.printCube(cube.getFacesArray());

		return true;
	};

	// TODO this is weird logic...
	var displacedAPiece = true;
	while(displacedAPiece)
	{
		solvePiecesOnBottom();
		displacedAPiece = displaceAnIncorrectlyOrientedPiece();
	}
	
	testUtility.printCube(cube.getFacesArray());
};