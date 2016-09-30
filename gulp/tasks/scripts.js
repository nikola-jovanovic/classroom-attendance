var browserify 	= require('browserify');
var fs 			= require("fs");

module.exports = function (gulp, plugins, config) {
	return function () {
		browserify(config.source('app/Bootstrap.js'))
			.transform("babelify", {presets: ["es2015", "react"]})
			.bundle()
			.pipe(fs.createWriteStream(config.destination('bundle.js')));
	};
};