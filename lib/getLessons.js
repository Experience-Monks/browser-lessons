var dstruc = require('dstruc').sync;
var cleanLessons = require('./cleanLessons');

module.exports = function(lessonPath) {

	try {
		var contents = dstruc(lessonPath);
	} catch( e ) {
		throw new Error('Lesson path is not correct');
	}
	
	return cleanLessons(contents);
};