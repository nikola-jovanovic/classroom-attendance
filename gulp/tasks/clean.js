// Clean dist folder
module.exports = function (gulp, plugins, config) {
	return function () {
		return gulp.src(config.dest, {read: false})
			.pipe(plugins.clean({
				force: true
			}));
	};
};