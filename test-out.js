var tapBrowserEl = require('tap-browser-el');
var css = require('dom-css');

var isTapOpen = true;
var container = document.createElement('div');
var containerToggle = document.createElement('div');
var containerTap = document.createElement('div');
var arrow = document.createElement('div');
var title = document.createElement('span');
var arrow;

css(container, {
	'position': 'absolute',
	'right': 0,
	'bottom': 0,
	'opacity': 0.9,
	'font-family': 'Verdana, Geneva, sans-serif',
	width: '400px',
	'-webkit-user-select': 'none',
	'-moz-user-select': 'none',
	'-ms-user-select': 'none',
	'user-select': 'none',
	'cursor': 'pointer'
});

// setup tap export
tapBrowserEl( {
	el: containerTap,
	onFinishedTestPart: onCheckOpen,
	onFinished: onCheckOpen,
	outPutToConsole: false
});

css(containerTap, {
	'position': 'relative',
	'top': 0,
	'display': 'block',
	'width': '100%',
	'overflow': 'scroll',
	'max-height': '0px',
	'-webkit-transition': 'max-height 0.2s cubic-bezier(0.190, 0.185, 0.000, 1.000)',
	'-mox-transition': 'max-height 0.2s cubic-bezier(0.190, 0.185, 0.000, 1.000)',
	'-ie-transition': 'max-height 0.2s cubic-bezier(0.190, 0.185, 0.000, 1.000)',
	'transition': 'max-height 0.2s cubic-bezier(0.190, 0.185, 0.000, 1.000)'
});

// setup toggle open and closed
css(containerToggle, {
	'height': '24px',
	'padding': '10px',
	'background': '#0F0D15',
	'border-left': '5px solid #B8AED3',
	'color': '#AEA4C8',
	'font-size': '20px'
});

title.innerHTML = 'Test Results';
css(arrow, {
	'width': 0,
	'height': 0,
	'border-left': '5px solid transparent',
	'border-right': '5px solid transparent',
	'border-top': '5px solid #AEA4C8',
	'display': 'inline-block',
	'position': 'relative',
	'top': '-3px',
	'margin-right': '10px'
});

containerToggle.appendChild(arrow);
containerToggle.appendChild(title);

container.appendChild(containerToggle);
container.appendChild(containerTap);

document.body.insertBefore(container, document.body.firstChild);

container.addEventListener('click', function() {

	if(isTapOpen) {
		closeTapOut();
	} else {
		openTapOut();
	}
});

function onCheckOpen() {
	if(isTapOpen) {
		openTapOut();
	}
}

function openTapOut() {
	
	var testParts = document.getElementsByClassName('tap-test-part');
	var testResult = document.getElementsByClassName('tap-result');
	var height = 0;

	if(testResult.length > 0) {

		height = testResult[ 0 ].getBoundingClientRect().bottom;
	} else if(testParts.length > 0) {

		height = testParts[ testParts.length - 1 ].getBoundingClientRect().bottom;
	}

	isTapOpen = true;

	css(containerTap, {
		'max-height': window.innerHeight + 'px'
	});
}

function closeTapOut() {

	isTapOpen = false;

	css(containerTap, {
		'max-height': '0px'
	});
}

module.exports = {
	el: container,
	open: openTapOut,
	close: closeTapOut
};