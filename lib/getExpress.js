var express = require('express');
var path = require('path');
var landing = require('./routes/landing');
var lesson = require('./routes/lesson');
var practiceSolution = require('./routes/practice-solution');
var globalcss = require('./routes/globalcss');

var fs = require('fs');
var path = require('path');


module.exports = function(s) {

	var app = express();
	var cssRoute = globalcss(s);

	app.get('/', landing(s));
	app.get('/global.css', cssRoute);

	// add in special routes
	if(s.routes) {

		for(var i in s.routes) {
			app.get(i, s.routes[i]);
		}
	}

	// create routes for all lessons
	for(var cLesson in s.lessons) {

		app.get('/' + cLesson + '/global.css', cssRoute);
		app.get('/' + cLesson + '/*', lesson(cLesson, s));
		
		app.get('/' + cLesson + '/practice/global.css', cssRoute);
		app.get('/' + cLesson + '/solution/global.css', cssRoute);
		app.get('/' + cLesson + '/practice/*', practiceSolution('practice', cLesson, s));
		app.get('/' + cLesson + '/solution/*', practiceSolution('solution', cLesson, s));
	}

	return app;
};