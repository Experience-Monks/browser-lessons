var templates = require('../../templates');

module.exports = function(s) {

	var data = {
		path: '',
		lessons: s.lessons,
		name: s.name,
		description: s.description
	};

	return function(req, res) {

		res.send(templates.header(data) + templates.landing(data) + templates.footer(data));
	};
};