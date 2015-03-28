var minimist = require('minimist');
var path = require('path');

var server = require('./server');
var getLessons = require('./lib/getLessons');
var copySolutionsAndPractice = require('./lib/copySolutionsAndPractice');

module.exports = function(settings) {

	var args = minimist(process.argv);
	var s = settings = settings || {};

	s.out = s.out || args.out || '.';
	s.pathLessons = path.resolve(s.pathLessons || path.join('lessons'));
	s.name = s.name || 'in settings pass name';
	s.description = s.description || 'in settings pass description';

	s.lessons = getLessons(s.pathLessons);

	// copy practice and solution files to s.out
	copySolutionsAndPractice(s, function() {

		// start the server
		server(s);	
	});
};