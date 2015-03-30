var usersExport = require('usersExport');

usersExport( function(value) {

	// the user did it right
	if(value == '10') {

		console.log('you got it right');
	// the user did it wrong
	} else {

		console.log('you got it wrong. you\'re value was', value);
	}
});