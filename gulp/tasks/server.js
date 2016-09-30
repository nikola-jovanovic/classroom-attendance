var express 	= require("express"),
	path		= require('path'),
	students 	= [];

module.exports = function (gulp, plugins, config) {
	return function () {
		var app = express();
		app.use(express.static('dist'));

		app.get("/api/students", function (req, res) {
			try {
				students = require('../../src/app/data/students');
			} catch(e) {
				console.error("There is no students module");
			}
			console.log('Retrieving students...');

			if (students.length) {
				console.log('Successfully retrieved students...');
				console.log('In total: %d',  students.length);
				res.send(students);
			} else {
				console.log('There are no students');
				res.status(403).send({
					success: false,
					message: 'There are no students'
				});
			}
		});

		app.get("*", function (req, res) {
			res.sendFile(path.join(__dirname, '../../dist/index.html'));
		});

		

		var server = app.listen(3000, function () {
			console.log("Classroom attendance listening on %s...", server.address().port);
		});
	};
};