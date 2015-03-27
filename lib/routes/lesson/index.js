var fs = require('fs');
var path = require('path');
var marked = require('marked');

module.exports = function(menuHTML, lesson, settings) {

	var pathLessons = settings.pathLessons;
	var lessons = settings.lessons;
	var dirInfo = lessons[lesson];
	var indexHTML = '';
	var template;

	// if theres a md file use it
	if(dirInfo.files.indexOf('index.md') > -1) {

		indexHTML = marked(
			fs.readFileSync(
				path.join(pathLessons, lesson, 'index.md'),
				'utf8'
			)
		);
	// if theres an html file use it
	} else if(dirInfo.files.indexOf('index.html') > -1) {

		indexHTML = fs.readFileSync(
			path.join(pathLessons, lesson, 'index.html'),
			'utf8'
		);
	}

	indexHTML += menuHTML;

	return function(req, res) {

		res.send(indexHTML);
	};
};