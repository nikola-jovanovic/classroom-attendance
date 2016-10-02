// Optimize images
module.exports = function (gulp, plugins, config) {
	return function () {
		return gulp.src(config.source('assets/img/**'))
			.pipe(plugins.imagemin())
			.pipe(gulp.dest(config.destination('img')));
	};
};