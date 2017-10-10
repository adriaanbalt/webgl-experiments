var glslify = require('glslify'); // this has to be required separately for some reason

// REQUIREMENTS
var PIXI = require('pixi.js')
  , PixiScene = require('./PixiScene.js')
  , Kaleidoscope = require('./Kaleidoscope.js')
  , dat = require('dat-gui');

var scene = new PixiScene(),                                                    // create a new PixiJS Scene
    renderSize = 600,                                                           // square stage area
    container = new PIXI.Container(),                                           // the container for the graphics
    kaleido = new Kaleidoscope( scene, container, renderSize );                 // kaleidoscope template for drawing our scene to

// -----------------------------------------------------------------------------
//
// START DRAWING HERE
//
// -----------------------------------------------------------------------------

var count = 0;
/*
var square = new PIXI.Graphics();
square.beginFill( 0xff );
square.drawRect( 0, 0, 300, 300);
// square.anchor = new PIXI.Point( 0.5, 0.5 );
square.pivot = new PIXI.Point(square.width/2, square.height/2);
square.position.x = 0;
square.position.y = 0;
// square.rotation = 30.0;
square.endFill();
container.addChild( square );*/

var logo = new PIXI.Sprite.fromImage( 'assets/pixel-club-logo.png' );
logo.anchor = new PIXI.Point( 0.5, 0.5 );
logo.position.x = logo.position.y = renderSize * 0.5;
logo.blendMode = PIXI.BLEND_MODES.ADD;
container.addChild( logo );

// lets create moving shape
/*
var path = new PIXI.Graphics();
container.addChild(path);
path.position.x = renderSize / 2;
path.position.y = renderSize / 2;*/

var circles = [];
for( var i = 0; i < 30; i++ ){
  var circle = new PIXI.Graphics();
  circle.beginFill( PIXI.utils.rgb2hex( [Math.random(), Math.random(), Math.random()] ) );
  circle.drawCircle(0, 0, (Math.random() * 50) + 20 );
  circle.endFill();

  var cSprite = new PIXI.Sprite( circle.generateTexture() );
  cSprite.position.x = Math.random() * renderSize;
  cSprite.position.y = Math.random() * renderSize;
  cSprite.velX = (Math.random() - 0.5) * 3.0;
  cSprite.velY = (Math.random() - 0.5) * 3.0;

  cSprite.blendMode = PIXI.BLEND_MODES.ADD;
  circles.push(cSprite);
  container.addChild(cSprite);
}


// -----------------------------------------------------------------------------
//
// UPDATE DRAWING HERE
//
// -----------------------------------------------------------------------------

window.addEventListener('update', function (e) {

  scene.renderer.backgroundColor = PIXI.utils.rgb2hex([
    0.5 + Math.sin( count * 0.02) * 0.5,
    0.5 + Math.cos( count * 0.001) * 0.5,
    0.5 + Math.cos( count * 0.015 ) * 0.5 ]);

  var scale = 0.5 + ( Math.cos( count * 0.001 ) * 0.25 );
  logo.rotation += 0.005;
  logo.scale.x = logo.scale.y = scale;
  // logo.tint = PIXI.utils.rgb2hex( (count % 255.0)/255.0, 0.5, 0.5 );
  logo.tint = PIXI.utils.rgb2hex( [ 1.0 - (0.5 + Math.sin(count * 0.01) * 0.5), 0.5  + Math.cos(count * 0.01) * 0.5, 0.5 + Math.sin(count * 0.01) * 0.5 ] );
  // logo.tint = 0xff0000;
/*
  square.rotation += 0.02;
  // square.position.x += 3.0;
  // square.position.y += 2.0;

  if( square.position.x > renderSize + 200 ){
    square.position.x = -200;
  }*/


  for( var i = 0; i < circles.length; i++ ){
    var circle = circles[i];
    var circleSize = circle.width;
    circle.position.x += circle.velX;
    circle.position.y += circle.velY;

    if(circle.position.x > renderSize ){
      circle.position.x = -circleSize;
    }else if(circle.position.x < -circleSize ){
      circle.position.x = renderSize;
    }

    if(circle.position.y > renderSize ){
      circle.position.y = -circleSize;
    }else if(circle.position.y < -circleSize ){
      circle.position.y = renderSize + circleSize;
    }
  }

  /*
  count += 0.05;
  path.clear();
  path.lineStyle(30, 0xff0000, 1);
	path.beginFill(0xffFF00, 0.5);

  // path.moveTo(0, Math.sin(count) * -50 );
  // path.lineTo(100, Math.sin(count) * 50 );
  // path.lineTo(200, Math.sin(count) * -50 );
  // path.lineTo(300, Math.sin(count) * 50 );
  // path.rotation += 0.01;

  var range = 20;
  path.moveTo(-120 + Math.sin(count) * range, -100 + Math.cos(count)* range);
	path.lineTo(120 + Math.cos(count) * range, -100 + Math.sin(count)* range);
	path.lineTo(120 + Math.sin(count) * range, 100 + Math.cos(count)* range);
	path.lineTo(-120 + Math.cos(count)* range, 100 + Math.sin(count)* range);
	path.lineTo(-120 + Math.sin(count) * range, -100 + Math.cos(count)* range);
  */
  count += 1;
}, false);


// -----------------------------------------------------------------------------
// setup scene
// -----------------------------------------------------------------------------

// gui stuff
var sceneData = {
    mode: "kaleidoscope",
    mirrorCount: 3
};
var gui = new dat.GUI();
var controls = {};
controls.mode = gui.add( sceneData, 'mode', ['default', 'kaleidoscope']).onChange(function(value) {
  setMode();
});
controls.mirrorCount = gui.add( sceneData, 'mirrorCount', 3, 20 ).step( 1 ).onChange(
  function( value ){
    kaleido.setMirrors( value );
  }
);

// toggle kaleidoscope
var setMode = function(){
  if( sceneData.mode == 'kaleidoscope' ){
    scene.stage.removeChild( container );
    scene.stage.addChild( kaleido.kaleidoStage );

  } else {
    scene.stage.addChild( container );
    scene.stage.removeChild( kaleido.kaleidoStage );
  }
}
setMode();

// draw bounds
var drawingArea = new PIXI.Graphics();
drawingArea.beginFill( 0x00, 0.0 );
drawingArea.lineStyle( 1, 0x00ff00 );
drawingArea.drawRect(-1, -1, renderSize+2, renderSize+2);
drawingArea.endFill();
container.addChild( drawingArea );


// globalize a few variables for use in dev console
window.scene = scene;
window.PIXI = PIXI;
