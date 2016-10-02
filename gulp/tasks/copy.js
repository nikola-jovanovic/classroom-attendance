// Copy html and fonts from src to dist folder
module.exports = function (gulp, plugins, config) {
	return function () {
		gulp.src(config.source('index.html'))
			.pipe(gulp.dest(config.destination()));

		gulp.src(config.source('assets/fonts/**'))
			.pipe(gulp.dest(config.destination('fonts')));
	};
};