var fs = require('fs');
var path = require('path');
var marked = require('marked');
var templates = require('../../templates');

module.exports = function(lesson, s) {

	var data = {
		path: '../',
		lessons: s.lessons
	};
	var pathLessons = s.pathLessons;
	var lessons = s.lessons;
	var dirInfo = lessons[lesson];
	var indexHTML = templates.header(data);
	var template;

	// if theres a md file use it
	if(dirInfo.files.indexOf('index.md') > -1) {

		indexHTML += marked(
			fs.readFileSync(
				path.join(pathLessons, lesson, 'index.md'),
				'utf8'
			)
		);
	// if theres an html file use it
	} else if(dirInfo.files.indexOf('index.html') > -1) {

		indexHTML += fs.readFileSync(
			path.join(pathLessons, lesson, 'index.html'),
			'utf8'
		);
	}

	indexHTML += templates.footer(data);

	return function(req, res) {

		res.send(indexHTML);
	};
};