module.exports = function (gulp, plugins, config) {
	return function () {
		return gulp.src('src/assets/img/**')
			.pipe(plugins.imagemin())
			.pipe(gulp.dest(config.destination('img')));
	};
};