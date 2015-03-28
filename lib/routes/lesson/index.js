var fs = require('fs');
var path = require('path');
var marked = require('marked');
var templates = require('../../templates');
var getMenuLessons = require('../../getMenuLessons');


// console.log(require('highlight.js/styles/default.css'));

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

module.exports = function(lesson, s) {

	var data = {
		path: '../',
		lessons: getMenuLessons(lesson, s.lessons),
		showBack: true
	};
	var pathLessons = s.pathLessons;
	var lessons = s.lessons;
	var lessonBasePath = path.join(pathLessons, lesson);
	var dirInfo = lessons[lesson];
	var indexHTML = templates.header(data);
	var template;

	// if theres a md file use it
	if(dirInfo.files.indexOf('index.md') > -1) {

		indexHTML += marked(
			fs.readFileSync(
				path.join(lessonBasePath, 'index.md'),
				'utf8'
			)
		);
	// if theres an html file use it
	} else if(dirInfo.files.indexOf('index.html') > -1) {

		indexHTML += fs.readFileSync(
			path.join(lessonBasePath, 'index.html'),
			'utf8'
		);
	}

	indexHTML += templates.solutionPractice(data);
	indexHTML += templates.footer(data);

	return function(req, res) {

		var file = req.params[0];

		if(file === '' || file === 'index.html') {

			res.send(indexHTML);	
		} else {

			console.log(path.join(lessonBasePath, file));
			res.sendFile(path.join(lessonBasePath, file));
		}
	};
};