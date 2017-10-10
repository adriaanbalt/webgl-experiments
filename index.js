"use strict";
//   PIXEL CLUB
//   Local development environment
//
//   Welcome.  This script is responsible for serving sketches on localhost:3333
//   for you to view and experiment with in your browser.



var glob = require('glob')
  , _ = require('underscore')
  , path = require('path')
  , browserify = require('browserify-middleware')
  , express = require('express')
  , sassMiddleware = require('node-sass-middleware')
  , colors = require('colors')
  , ncp = require('ncp')
  , messenger = require('messenger')
  , readJsonSync = require('read-json-sync')
  , packageJson = readJsonSync(`./package.json`)
  , app = express();

// MESSENGER CONFIG
var messengerClient = messenger.createSpeaker( 3334 );

// CUSTOM OBJECTS
var SketchTemplate = require('./SketchTemplate');

// CONSTANTS
const PORT = packageJson.pixelClub.port;

// PRIVATE VARS

// DATA STORE
var dataStore = {};
dataStore.sketches = {};
dataStore.sketchRoutes = {};

// Add glslify transform to browserify
browserify.settings({
  transform: ['glslify'],
  debug: true
});

// configure connect-livereload middlware
app.use(require('connect-livereload')());

// configure Sass middleware process for scss files
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    force: true,
    outputStyle: 'compressed'
}));
express.static(path.join(__dirname, 'public'));

// expose sketches files to the local server
app.use('/sketches', express.static('sketches'));
app.use('/', express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');


function refreshSketchTemplates() {
  // grab all the sketches with index.html files and put them in an array
  var files = glob.sync('./sketches/*/index.html');

  var updateTime = Date.now();

  // clear the local sketches cache
  dataStore.sketches = {};

  // loop through all sketches with an index.html and configure routes for them
  files.forEach( (p) => {

    // create a new SketchTemplate object with this path
    var e = new SketchTemplate( p );


    if( dataStore.sketchRoutes[p] === undefined ) {
      // configure a browserify route to its index.js file
      app.get(`/js/${e.name}/index.js`, function(req, res) { return browserify(`${e.pathRaw.dir}/src/index.js`) }());
      dataStore.sketchRoutes[p] = true;
    }



    // save it to our list of dataStore.sketches
    dataStore.sketches[p] = e;

  });

}

// initialize the sketches listing
refreshSketchTemplates();


// set up a route for the index page
app.get('/', function (req, res) {
  refreshSketchTemplates();
  res.render( 'index', dataStore );
});

var counter = 0;

// and finally start the server on the port specified
app.listen(PORT, function () {
  console.log(`Pixel Club Server listening on port ${PORT}.`.magenta);
  setTimeout( () => { counter++; messengerClient.shout('webserverStarted', { count: counter } ) }, 100);
});
