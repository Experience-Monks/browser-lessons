module.exports = function(menuHTML) {

	return function(req, res) {

		res.send(menuHTML);
	};
};