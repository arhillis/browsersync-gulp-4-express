var 
  gulp         = require('gulp'),
  config       = require('./config/gulp'),
  del          = require('del'),
  nodemon      = require('gulp-nodemon'),
  browserSync  = require('browser-sync').create(),
  sass         = require('gulp-sass')
;

// CLEAN
function clean() {
  return del(config.paths.dist_dir);
}

// VIEWS
function devViews() {
  return gulp
    .src(config.paths.views.src)
    //Process views
    .pipe(gulp.dest(config.paths.views.dist))
}

function watchViews(done) {
  gulp.watch(config.paths.views.src, gulp.series(devViews));
  done();
}

//STYLES
function devStyles() {
  return gulp
    .src(config.paths.styles.src)
    //Process styles
    .pipe(sass())
    .pipe(gulp.dest(config.paths.styles.dist))
}

function watchStyles(done) {
  gulp.watch(config.paths.styles.src, gulp.series(devStyles));
  done();
}

//SERVER
function server(cb) {
  var called = false;
  return nodemon(config.plugins.nodemon)
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
}

// BROWSER-SYNC

function browserSyncInit(done) {
  browserSync.init(config.plugins.browserSync)
  done();
}

//DEV
const dev = gulp.parallel(devStyles, devViews);

//WATCH
const watch = gulp.parallel(watchStyles, watchViews);

//DEFAULT
exports.default = gulp.series(clean, dev, server, gulp.parallel(watch, browserSyncInit));

