var glslify = require('glslify'); // this has to be required separately for some reason

// REQUIREMENTS
var PIXI = require('pixi.js')
  , PixiScene = require('./PixiScene.js')
  , dat = require('dat-gui');

var scene = new PixiScene(),                                                    // create a new PixiJS Scene
    container = new PIXI.Container();                                           // the container for the graphics

scene.stage.addChild( container );


// -----------------------------------------------------------------------------
//
// START DRAWING HERE
//
// -----------------------------------------------------------------------------

var square = new PIXI.Graphics();
square.beginFill( 0xff0000 );
square.drawRect( 0, 0, 300, 300);
square.pivot = new PIXI.Point(square.width/2, square.height/2);
square.position.x = scene.width/2;
square.position.y = scene.height/2;
square.rotation = 30.0;
square.endFill();
container.addChild( square );


// -----------------------------------------------------------------------------
//
// UPDATE DRAWING HERE
//
// -----------------------------------------------------------------------------
window.addEventListener('update', function (e) {

  square.rotation += 0.02;

}, false);


// globalize a few variables for use in dev console
window.scene = scene;
window.PIXI = PIXI;
