var minimist = require('minimist');
var path = require('path');
var merge = require('merge');

var server = require('./server');
var getLessons = require('./lib/getLessons');
var copySolutionsAndPractice = require('./lib/copySolutionsAndPractice');

module.exports = function(settings) {

	var args = minimist(process.argv, {
		boolean: [
			"doOpen"
		]
	});

	var s = settings = settings || {};

	s.out = s.out || args.out || '.';
	s.doOpen = s.doOpen || args.doOpen;
	s.pathModule = path.resolve(__dirname);
	s.pathLessons = path.resolve(s.pathLessons || path.join('lessons'));
	s.name = s.name || 'in settings pass name';
	s.description = s.description || 'in settings pass description';

	s.styles = merge({

		colorBG: '#121018',
		colorText: '#7c7491',
		colorBGHeading: '#1E1A29',
		colorHeading: '#9d93b6',
		colorBold: '#f191ae',

		colorInlineCode: '#e1f191',
		colorBGInlineCode: '#3d3451',
		
		colorBGMenu: '#121018',
		colorMenu: '#9D93B6',

		colorBorderMenuEven: '#94F0D9',
		colorBorderMenuOdd: '#94F0D9',
		colorBorderHeadingMenu: '#94F0D9',

		colorBorderPracticeOdd: '#E1F096',
		colorBorderPracticeEven: '#E1F096',
		colorBorderHeadingPractice: '#E1F096',
		
		colorBGPre: '#1e1a28',
		colorBorderPre: '#EF92AE'
	}, s.styles);

	s.lessons = getLessons(s.pathLessons);

	// copy practice and solution files to s.out
	copySolutionsAndPractice(s, function() {

		// start the server
		server(s);
	});
};