var fs = require('fs');
var path = require('path');
var cpr = require('cpr');

module.exports = function(s, cb) {

	var numToCopy = 0;
	var numCopied = 0;
	var pathTo;
	var pathFrom;
	var pathFromSolution;
	var pathFromPractice;
	var pathToSolution;
	var pathToPractice;
	var onFileCopied = function() {

		numCopied++;

		if(numCopied == numToCopy) {

			cb();
		}
	};

	// copy practice and solution files from s.pathLessons to s.out
	for(var i in s.lessons) {

		pathTo = path.join(s.out, i);
		pathFrom = path.join(s.pathLessons, i);
		
		if(!fs.existsSync(pathTo)) {

			pathFromPractice = path.join(pathFrom, 'practice');
			pathToPractice = path.join(pathTo, 'practice');
			pathFromSolution = path.join(pathFrom, 'solution');
			pathToSolution = path.join(pathTo, 'solution');

			if(fs.existsSync(pathFromPractice)) {

				numToCopy++;
				cpr(pathFromPractice, pathToPractice, onFileCopied);
			}

			if(fs.existsSync(pathFromSolution)) {

				numToCopy++;
				cpr(pathFromSolution, pathToSolution, onFileCopied);
			}
		}
	}
};