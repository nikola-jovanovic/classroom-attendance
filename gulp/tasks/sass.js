module.exports = function (gulp, plugins, config) {
	return function () {
		var development = plugins.environments.development,
			production = plugins.environments.production;

		return gulp.src(config.source('assets/sass/*.scss'))
			.pipe(development(plugins.sourcemaps.init()))
			.pipe(plugins.sass())
			.pipe(plugins.cssnano())
			.pipe(plugins.autoprefixer({
				browsers: ['last 2 versions', '> 1%', 'ie >= 8']
			}))
			.pipe(production(plugins.concat('style.css')))
			.pipe(development(plugins.sourcemaps.write()))
			.pipe(gulp.dest(config.destination('css')));
	};
};