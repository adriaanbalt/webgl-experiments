var gulp = require('gulp')
  , argv = require('yargs').argv
  , install = require("gulp-install")
  , colors = require("colors")
  , spawn = require('child_process').spawn
  , messenger = require('messenger')
  , readJsonSync = require('read-json-sync')
  , packageJson = readJsonSync(`./package.json`)
  , open = require('gulp-open')
  , watch = require('gulp-watch')
  , node;

// PRIVATE
var restartCount = 0;
var EXPRESS_ROOT = __dirname;

// create a messenger server
var listener = messenger.createListener(3334);

// We'll need a reference to the tinylr
// object to send notifications of file changes
var lr;
function startLivereload() {

  lr = require('tiny-lr')();
  lr.listen(35729);
}

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {

  if (node) {
    node.kill();
    console.log("Restarting local server...".red);
  }

  node = spawn('node', ['./index.js'], {stdio: 'inherit'})

  listener.on('webserverStarted', ( m, data ) => {

    restartCount++;

    if( restartCount === 1 ) {
      gulp.run('browser');
    }

    console.log( `Webserver restart ${ data['count'] }.`.grey );

  });

  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

/**
 * $ gulp browser
 * description: launch the browser to the local development url
 */
gulp.task('browser', function(){
  gulp.src(__filename)
  .pipe(open({uri: `http://localhost:${packageJson.pixelClub.port}/`}));
});

// Notifies livereload of changes detected
// by `gulp.watch()`
function notifyLivereload(event) {

  // `gulp.watch()` events provide an absolute path
  // so we need to make it relative to the server root
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);

  console.log("Livereload:" + fileName);

  lr.changed({
    body: {
      files: './index.js'
    }
  });
}

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', function() {

  startLivereload();

  // start the express server
  gulp.run('server')

  // restart the local server if things change
  gulp.watch(['./*.js'], function() {
    gulp.run('server');
  });

  // gulp.watch(['/sketches/*'], notifyLivereload);

  watch('sketches/**', function(e) {
    notifyLivereload(e);
  });

  // Need to watch for sass changes too? Just add another watch call!
  // no more messing around with grunt-concurrent or the like. Gulp is
  // async by default.
})

// clean up the local server if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})

var errorAlert = function(err){
  console.log("Error Alert", err);
}
