var templates = require('../../templates');

module.exports = function(s) {

	var data = {
		path: '',
		lessons: s.lessons
	};

	return function(req, res) {

		res.send(templates.header(data) + templates.footer(data));
	};
};