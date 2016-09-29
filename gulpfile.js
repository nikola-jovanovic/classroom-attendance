var gulp 		= require("gulp"),
	runSequence = require('run-sequence')
	plugins 	= require('gulp-load-plugins')(),
	config 		= require("./gulp/config"),
	production 	= plugins.environments.production;

var tasks = ['clean', 'eslint', 'html', 'images', 'sass', 'revision', 'inject', 'watch'];

// Register tasks
tasks.forEach(function (task) {
	gulp.task(task, require('./gulp/tasks/' + task)(gulp, plugins, config));
});

//Default build
gulp.task('default', function (cb) {
	if (production()) {
		runSequence(['core'],  ['revision'], ['inject'], cb);
	} else {
		runSequence(['core'], ['inject'], ['watch'], cb);
	}
});

//Core task
gulp.task('core', ['eslint', 'clean'], function (cb) {
	runSequence(['html'], ['images'], ['sass'], cb);
});