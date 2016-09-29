module.exports = {
	DEST: './dist/',
	SRC: './src/',
	PATH: '/',
	PORT: 8080,
	PROXY: 'localhost',
	source: function (path) {
		return this.SRC + path;
	},
	destination: function (path) {
		return this.DEST + path;
	},
	absolutePath: function(path){
		return this.PATH + path;
	}
}