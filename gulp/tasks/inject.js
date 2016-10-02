// Inject style files
module.exports = function (gulp, plugins, config) {
	return function () {
		var target = gulp.src(config.destination('index.html')),
			sourcePath;
		
		if (plugins.environments.production()) {
			sourcePath = 'css/**/*.*.css';
		} else {
			sourcePath = 'css/**/*.css';
		}

		var source = gulp.src(config.destination(sourcePath), {read: false});

		return target.pipe(plugins.inject(source, {
			ignorePath: 'dist',
			relative: true
		})).pipe(gulp.dest(config.destination()));
	};
};