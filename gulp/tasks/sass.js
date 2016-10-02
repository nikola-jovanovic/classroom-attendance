// Handle styles (compile sass, minify, autoprexier, concat files)
module.exports = function (gulp, plugins, config) {
	return function () {
		return gulp.src(config.source('assets/sass/main.scss'))
			.pipe(config.env.development(plugins.sourcemaps.init()))
			.pipe(plugins.sass())
			.pipe(plugins.cssnano())
			.pipe(plugins.autoprefixer({
				browsers: ['last 2 versions', '> 1%', 'ie >= 8']
			}))
			.pipe(config.env.development(plugins.sourcemaps.write()))
			.pipe(gulp.dest(config.destination('css')));
	};
};