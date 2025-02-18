var paths = {
	dist_dir: 'dist',
	dist_files: 'dist/**/*.*',
	views: {
		src: 'src/views/**/*.ejs',
		dist: 'dist/views'
	},
	styles: {
		src: 'src/scss/**/*.scss',
		dist: 'dist/public/styles'
	}
};

module.exports = {
	paths: paths,
	plugins: {
			browserSync: {
	    proxy: "localhost:3000",
	    port: 5000, 
	    files: [ 
	      paths.dist_files 
	    ],
	    notify: true
    },
    nodemon: {
      script: 'app.js',
      ignore: [
        'gulpfile.js',
        'config/',
        'node_modules/'
      ]
    }
	}
};
