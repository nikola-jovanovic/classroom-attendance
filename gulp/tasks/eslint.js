// Lint react code
module.exports = function (gulp, plugins, config) {
	return function () {
		return gulp.src(config.source('app/**/*.js'))
			.pipe(plugins.eslint.format());
	};
};