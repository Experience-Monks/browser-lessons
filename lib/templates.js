var path = require('path');
var fs = require('fs');
var handlebars = require('handlebars');

var pathHBS = path.join(__dirname, '..', 'hbs');

handlebars.registerPartial('menu', fs.readFileSync(path.join(__dirname, '..', 'hbs', 'menu.hbs'), 'utf8'));

module.exports = {

	header: handlebars.compile(fs.readFileSync(path.join(pathHBS, 'header.hbs'), 'utf8')),
	footer: handlebars.compile(fs.readFileSync(path.join(pathHBS, 'footer.hbs'), 'utf8')),
	landing: handlebars.compile(fs.readFileSync(path.join(pathHBS, 'landing.hbs'), 'utf8')),
	solutionPractice: handlebars.compile(fs.readFileSync(path.join(pathHBS, 'solution-practice.hbs'), 'utf8')),
	footerSolutionPractice: handlebars.compile(fs.readFileSync(path.join(pathHBS, 'footer-practice-solution.hbs'), 'utf8'))
};
