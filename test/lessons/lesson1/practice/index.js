module.exports = function(cb) {

	// should be 10
	cb(10); 

	// should be 15
	cb(3); 

	// should be 20
	setTimeout(cb.bind(undefined, 20), 2000);
};