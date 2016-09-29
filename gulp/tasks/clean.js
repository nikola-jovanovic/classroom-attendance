module.exports = function (gulp, plugins, config) {
	return function () {

		return gulp.src(config.DEST, {read: false})
			.pipe(plugins.clean({
				force: true
			}));
	};
};