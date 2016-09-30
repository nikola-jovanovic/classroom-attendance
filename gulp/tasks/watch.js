module.exports = function (gulp, plugins, config) {

	return function () {
		gulp.watch(config.source('assets/sass/**/*.scss'), ['sass']);
		gulp.watch(config.source('images/*'), ['images']);
		gulp.watch(config.source('app/**/*.js'), ['scripts']);
	};
};