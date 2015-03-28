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
	var encodedRoute;

	app.get('/', landing(s));
	app.get('/global.css', cssRoute);

	// add in special routes
	if(s.routes) {

		for(var i in s.routes) {
			app.get(encodeURI(i), s.routes[i]);
		}
	}

	// create routes for all lessons
	for(var cLesson in s.lessons) {

		encodedRoute = encodeURI(cLesson);

		app.get('/' + encodedRoute + '/global.css', cssRoute);
		app.get('/' + encodedRoute + '/*', lesson(cLesson, s));
		
		app.get('/' + encodedRoute + '/practice/global.css', cssRoute);
		app.get('/' + encodedRoute + '/solution/global.css', cssRoute);
		app.get('/' + encodedRoute + '/practice/*', practiceSolution('practice', cLesson, s));
		app.get('/' + encodedRoute + '/solution/*', practiceSolution('solution', cLesson, s));
	}

	return app;
};