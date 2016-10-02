module.exports = {
	dest: './dist/',
	src: './src/',
	port: 3000,
	source: function (path = '') {
		return this.src + path;
	},
	destination: function (path = '') {
		return this.dest + path;
	}
}