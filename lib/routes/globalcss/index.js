var fs = require('fs');
var path = require('path');
var less = require('less');
var css;

module.exports = function(s) {

	return function(req, res) {

		res.type('css');
		getCSS(s, res.send.bind(res));
	};
};

function getCSS(s, cb) {

	if(!css) {

		var pathLess = path.join( s.pathModule, 'less' );
		var highlightCSS = fs.readFileSync(path.join(s.pathModule, 'node_modules', 'highlight.js', 'styles', 'hybrid.css'));
		var srcLess = fs.readFileSync(path.join(pathLess, 'global.less'), 'utf8');
		
		less.render(srcLess, {

			paths: [ pathLess ],
			compress: true,
			modifyVars: s.styles
		})
		.then( function(out) {

			css = highlightCSS + out.css;

			cb(css);
		})
		.catch( function(e) {

			cb(e);
		});
	} else {

		process.nextTick( function() {

			cb(css);
		});
	}
}