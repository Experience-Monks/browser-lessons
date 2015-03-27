var minimist = require('minimist');

var server = require('./server');
var getLessons = require('./lib/getLessons');
var copySolutionsAndPractice = require('./lib/copySolutionsAndPractice');

module.exports = function(settings) {

	var args = minimist(process.argv);
	var s = settings = settings || {};

	s.out = s.out || args.out || '.';
	s.pathLessons = s.pathLessons || path.join('lessons');

	s.pathLessons = s.pathLessons || path.join('lessons');
	s.lessons = getLessons(s.pathLessons);

	// copy practice and solution files to s.out
	copySolutionsAndPractice(s, function() {

		// start the server
		server(s);	
	});
};