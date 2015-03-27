var express = require('express');
var path = require('path');
var menu = require('./routes/menu');
var lesson = require('./routes/lesson');
var practiceSolution = require('./routes/practice-solution');

var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');

module.exports = function(s) {

	var app = express();
	var menuTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, '..', 'hbs', 'menu.hbs'), 'utf8'));
	var menuHTMLMain = menuTemplate( {
		path: '',
		lessons: s.lessons
	});
	var menuHTMLLesson = menuTemplate( {
		path: '../',
		lessons: s.lessons
	});

	app.get('/', menu(menuHTMLMain));

	// create routes for all lessons
	for(var cLesson in s.lessons) {

		app.get('/' + cLesson, lesson(menuHTMLLesson, cLesson, s));
		app.get('/' + cLesson + '/practice/*', practiceSolution('practice', cLesson, s));
		app.get('/' + cLesson + '/solution/*', practiceSolution('solution', cLesson, s));
	}

	return app;
};