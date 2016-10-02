var gulp 		= require("gulp"),
	runSequence = require('run-sequence')
	plugins 	= require('gulp-load-plugins')(),
	config 		= require("./gulp/config");

// Check for environment
config.env = {
	production: plugins.environments.production,
	development: plugins.environments.development
}

// Define list of tasks
var tasks = ['clean', 'eslint', 'copy', 'images', 'sass', 'scripts', 'inject', 'watch', 'server'];

// Register tasks
tasks.forEach(function (task) {
	gulp.task(task, require('./gulp/tasks/' + task)(gulp, plugins, config));
});

// Default build
gulp.task('default', function (cb) {
	if (config.env.production()) {
		runSequence(['core'], ['inject'], ['server'], cb);
	} else {
		runSequence(['core'], ['inject'], ['watch'], ['server'], cb);
	}
});

// Core task
gulp.task('core', ['eslint', 'clean'], function (cb) {
	runSequence(['copy'], ['images'], ['sass'], ['scripts'], cb);
});