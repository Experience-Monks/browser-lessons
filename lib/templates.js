var path = require('path');
var fs = require('fs');
var handlebars = require('handlebars');

handlebars.registerPartial('menu', fs.readFileSync(path.join(__dirname, '..', 'hbs', 'menu.hbs'), 'utf8'));

module.exports = {

	header: handlebars.compile(fs.readFileSync(path.join(__dirname, '..', 'hbs', 'header.hbs'), 'utf8')),
	footer: handlebars.compile(fs.readFileSync(path.join(__dirname, '..', 'hbs', 'footer.hbs'), 'utf8'))
};
