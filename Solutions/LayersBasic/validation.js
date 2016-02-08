
var validateTopSolved = function(cube)
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
};

validateMiddleSolved = function(cube)
{
	validateTopSolved(cube);

};

module.exports = {
	validateTopSolved: validateTopSolved,
	validateMiddleSolved: validateMiddleSolved
};