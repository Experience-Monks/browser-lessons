var path = require('path');
var browserify = require('browserify');
var fs = require('fs');

module.exports = function(practiceOrSolution, lesson, s) {

	return function(req, res) {
		var file = req.params[0] == '' ? 'index.html' : req.params[0];
		var userFilePath; // path to file we're requesting maybe anything on local system
		var pathSolutionPractice; // this is a path to a solution or practice file which will require users index.js
		var b;

		userFilePath = path.resolve(path.join(s.out, lesson, practiceOrSolution, file));

		// send all files regularly but js files we want to browserify
		if(file != 'index.js') {

			res.sendFile(userFilePath);	
		// this is a index.js file so we should browserify
		} else {

			// set mimetype for what will be exported
			res.type('js');

			b = browserify( {
				paths: [
					path.join(path.dirname(process.mainModule.filename), 'node_modules')
				]
			});

			// check
			pathSolutionPractice = path.join(s.pathLessons, lesson, practiceOrSolution + '.js');

			// if there's a practice or solution file then this will be the index
			if(fs.existsSync(pathSolutionPractice)) {

				b.add(userFilePath, { expose: 'usersExport' });
				b.add(pathSolutionPractice);

			// if there was no practice or solution file then will just serve the users index.js browserified
			} else {

				b.add(userFilePath);
			}

			
			
			b.bundle().pipe(res);
		}
	};
};