'use strict';

var watchify = require('watchify')
  , browserify = require('browserify')
  , gulp = require('gulp')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , gutil = require('gulp-util')
  , sourcemaps = require('gulp-sourcemaps')
  , assign = require('lodash').assign
  , connect = require('gulp-connect')
  , open = require('gulp-open')
  , watch = require('gulp-watch');

// constants
var SERVER_PORT = 5000 + Math.floor( Math.random() * 500 );

// add custom browserify options here
var customOpts = {
  entries: ['./src/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));


// add transformations here
// i.e. b.transform(coffeeify);

// start start local dev server w/ live reload
gulp.task('connect', function() {
  connect.server({
    port: SERVER_PORT,
    livereload: true
  });
});

// open the default Browserify
gulp.task('browser', function() {
    gulp.src(__filename)
      .pipe( open({ uri: 'http://localhost:' + SERVER_PORT }));
});

gulp.task('default', ['js', 'connect', 'watch', 'browser']);

// gulp.task('html', function() {
//   return gulp.src('*.html')
//         .pipe(connect.reload());
// })

gulp.task('html', function () {
  gulp.src('*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
});

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
}
