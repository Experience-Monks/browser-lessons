var path = require('path');

var getExpress = require('./lib/getExpress');
var getport = require('getport');

module.exports = function(settings) {

	var s = settings || {};
	var app;

	if(s.port) {
		startExpress(s);
	} else {
		getport(function(e, port) {

			if(e) {
				throw new Error('Could not get free port to run lesson on');
			}

			s.port = port;

			startExpress(s);
		});
	}
};

function startExpress(s) {

	app = getExpress(s);

	app.listen(s.port);

	console.log('Lessons are running at http://localhost:' + s.port);
}