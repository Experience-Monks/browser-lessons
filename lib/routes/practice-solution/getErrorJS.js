var browserify = require('browserify');
var through = require('through');
var path = require('path');
var TEMPLATE_PATH = path.join(__dirname, 'templateError.js');

module.exports = function(lessonPath, e) {

	var errorMessage = e.stack.replace(lessonPath, '').replace("'", "\'").split('\n').join('\\n');
	var replaceTokens = {
		'{{errorMessage}}': errorMessage
	};
	var b = browserify();
	var stream;

	b.add(TEMPLATE_PATH);
	b.transform(function(file) {

		var data = '';

		return through(write, end);

		function write(buf) {
			data += buf;
		}

		function end() {

			for(var i in replaceTokens) {
				data = data.replace(i, replaceTokens[ i ]);
			}

			this.queue(data);
			this.queue(null);
		}
	});

	stream = b.bundle();
	stream.on('error', function() {

		console.log(e.stack);
	});

	return stream;
};