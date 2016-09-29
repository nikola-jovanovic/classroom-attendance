module.exports = function (gulp, plugins, config) {
	return function () {
		return gulp.src(config.destination('**'))
			.pipe(plugins.revAll.revision({
				dontRenameFile: ['.html', '.ttf', '.jsx']
			}))
			.pipe(gulp.dest(config.DEST));
	};
};
