var css = require('dom-css');

var container = document.createElement('div'); 
var message = document.createElement('div');
var elError = document.createElement('pre');

styleContainer(container);
styleMessage(message);
styleError(elError);

elError.innerHTML = '{{errorMessage}}';

message.innerHTML = 'There was an issue while parsing your scripts:';

container.appendChild(message);
container.appendChild(elError);
document.body.insertBefore(container, document.body.firstChild);

function styleContainer(el) {

	css(el, {
		'background': '#0F0D15',
		'color': '#9D94B5',
		'font-size': '15px',
		'padding-bottom': '20px',
		'font-family': 'Verdana, Geneva, sans-serif'
	});
}

function styleMessage(el) {
	css(el, {
		'font-size': '20px',
		'color': '#AEA4C8',
		'background': '#1E1A28',
		'border-left': '5px solid #B8AED3',
		'padding': '10px'
	});
}

function styleError(el) {

	css(el, {
		'overflow': 'scroll',
		'background': '#1E1A28',
		'margin': '20px 20px 0px 20px',
		'min-height': '100px',
		'border-left': '2px solid #ED93AE',
		'padding': '10px',
		'font-family': 'Verdana, Geneva, sans-serif'
	});
}