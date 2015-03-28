var templates = require('../../templates');
var getMenuLessons = require('../../getMenuLessons');

module.exports = function(s) {

	var data = {
		path: '',
		lessons: getMenuLessons(undefined, s.lessons),
		name: s.name,
		description: s.description
	};

	return function(req, res) {

		res.send(templates.header(data) + templates.landing(data) + templates.footer(data));
	};
};