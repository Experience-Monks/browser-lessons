var browserLessons = require('./..');
var fs = require('fs');
var path = require('path');
var minimist = require('minimist');
var rimraf = require('rimraf');

var args = minimist(process.argv);

var testOutPath = args.out;

if(fs.existsSync(testOutPath)) {
	rimraf.sync(testOutPath);
}

fs.mkdir(testOutPath, function() {

	browserLessons( {

		pathLessons: path.join('test', 'lessons')
	});
});

process.on('exit', function() {
	fs.rmdirSync(testOutPath);
});
