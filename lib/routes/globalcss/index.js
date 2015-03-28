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

		var highlightCSS = fs.readFileSync(path.join(s.pathModule, 'node_modules', 'highlight.js', 'styles', 'github.css'));
		var srcLess = '@baseURL: "' + s.pathModule + '/";\n' +
				      fs.readFileSync(path.join(__dirname, '..', '..', '..', 'less', 'global.less'), 'utf8');
		

		less.render(srcLess)
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