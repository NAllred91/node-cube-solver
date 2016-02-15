var validateTopSolved = function(cube) {
    var cubeArray = cube.getFacesArray();

    if(_.uniq(cubeArray[0]).length !== 1) {
        var err = new Error("Invalid solution, top face is incorrect.");
        err.cube = cubeArray;
        throw err;
    }

    var sides = [cubeArray[1], cubeArray[2], cubeArray[3], cubeArray[4]];

    _.each(sides, function(side) {
        var center = side[4];
        if(side[0] !== center || side[1] !== center || side[2] !== center) {
            throw new Error("Invalid solution, side face is incorrect.");
        }
    });
};

var validateMiddleSolved = function(cube) {
    validateTopSolved(cube);

    var cubeArray = cube.getFacesArray();

    var sides = [cubeArray[1], cubeArray[2], cubeArray[3], cubeArray[4]];

    _.each(sides, function(side) {
        var center = side[4];
        if(side[3] !== center || side[5] !== center) {
            throw new Error("Invalid solution, side face is incorrect.");
        }
    });
};

var validateBottomCornersSolved = function(cube) {
    validateMiddleSolved(cube);

    var cubeArray = cube.getFacesArray();

    var sides = [cubeArray[1], cubeArray[2], cubeArray[3], cubeArray[4]];

    _.each(sides, function(side) {
        var center = side[4];
        if(side[4] !== center || side[6] !== center) {
            throw new Error("Invalid solution, side face is incorrect.");
        }
    });

    var bottom = cubeArray[5];
    var bottomCenter = bottom[4];
    if(bottom[0] !== bottomCenter || bottom[2] !== bottomCenter || bottom[6] !== bottomCenter || bottom[8] !== bottomCenter) {
        throw new Error("Invalid solution, bottom face is incorrect.");
    }
};

module.exports = {
    validateTopSolved: validateTopSolved,
    validateMiddleSolved: validateMiddleSolved,
    validateBottomCornersSolved: validateBottomCornersSolved
};