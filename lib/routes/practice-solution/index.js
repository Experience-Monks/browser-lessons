var path = require('path');
var browserify = require('browserify');

module.exports = function(practiceOrSolution, lesson, s) {

	return function(req, res) {
		var file = req.params[0] == '' ? 'index.html' : req.params[0];
		var filePath;
		var absPath;
		var b;

		filePath = path.join(s.out, lesson, practiceOrSolution, file);
		absPath = path.join(process.cwd(), filePath);

		// send all files regularly but js files we want to browserify
		if(file != 'index.js') {

			res.sendFile(absPath);	
		// this is a index.js file so we should browserify
		} else {

			res.type('js');

			b = browserify();
			b.add(absPath);
			b.bundle().pipe(res);
		}
	};
};