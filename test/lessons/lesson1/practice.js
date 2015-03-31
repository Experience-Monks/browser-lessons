var usersExport = require('usersExport');
var testOut = require('../../../test-out');
var test = require('tape');

var testCount = 0;
var tests = [
	function(t, value) {
		t.equal(value, 10, 'the value was 10');
	},
	function(t, value) {
		t.equal(value, 15, 'the value was 15');
	},
	function(t, value) {
		t.equal(value, 20, 'the value was 20');
		t.end();
	}
];

test('testing returned values', function(t) {

	usersExport(function(value) {

		tests[ testCount ](t, value);

		testCount++;
	});
});