module.exports = function(currentLesson, lessons) {

	return Object.keys(lessons).filter( function(value) {

		return value != currentLesson;
	});
};