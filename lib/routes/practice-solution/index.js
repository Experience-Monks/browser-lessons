var path = require('path');
var browserify = require('browserify');
var fs = require('fs');
var getError = require('./getErrorJS');
var templates = require('../../templates');

module.exports = function(practiceOrSolution, lesson, s) {

	return function(req, res) {
		var file = req.params[ 0 ] == '' ? 'index.html' : req.params[0];
		var lessonPath = path.resolve(path.join(s.out, lesson));
		var userFolderPath = path.resolve(path.join(lessonPath, practiceOrSolution));
		var userFilePath = path.join(userFolderPath, file); // path to file we're requesting maybe anything on local system
		var data = {
			name: lesson
		};
		var outStream;
		var pathSolutionPractice; // this is a path to a solution or practice file which will require users index.js
		var b;

		// check if we have an index.html if so send it otherwise send defaults
		if(file == 'index.html') {

			// check if it exists
			if(fs.existsSync(userFilePath)) {

				res.sendFile(userFilePath);	
			} else {

				res.type('html');
				res.send(templates.header(data) + templates.footerSolutionPractice(data));
			}
		// this is a index.js file so we should browserify
		} else if(file == 'index.js') {

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

			outStream = b.bundle();
			outStream.on('error', function(e) {

				getError(lessonPath, e).pipe(res);
			});
			outStream.pipe(res);

		// send all files regularly
		} else {

			res.sendFile(userFilePath);	
		}
	};
};