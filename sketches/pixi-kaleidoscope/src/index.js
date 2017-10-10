// REQUIREMENTS
var PIXI = require('pixi.js')
  , PixiScene = require('./PixiScene.js')
  , Kaleidoscope = require('./Kaleidoscope.js')
  , dat = require('dat-gui');

var scene = new PixiScene(),                                                    // create a new PixiJS Scene
    renderSize = 800,                                                           // square stage area
    container = new PIXI.Container(),                                           // the container for the graphics
    kaleido = new Kaleidoscope( scene, container, renderSize );                 // kaleidoscope template for drawing our scene to

// -----------------------------------------------------------------------------
//
// START DRAWING HERE
//
// -----------------------------------------------------------------------------

var square = new PIXI.Graphics();
square.beginFill( 0xff0000 );
square.drawRect( 0, 0, 300, 300);
// square.pivot = new PIXI.Point(square.width/2, square.height/2);
// square.position.x = 150;
// square.position.y = 150;
// square.rotation = 30.0;
square.endFill();
container.addChild( square );

// array of sprites
var circle = new PIXI.Graphics();
circle.beginFill( 0xffffff );
circle.drawCircle( 0, 0, 100 );
circle.endFill();
var circleTex = circle.generateTexture();
var circles = [];

for( var i = 0; i < 20; i++ ){
  var cSprite = new PIXI.Sprite( circleTex );
  cSprite.position.x = Math.random() * renderSize;
  cSprite.position.y = Math.random() * renderSize;
  cSprite.tint = PIXI.utils.rgb2hex( [Math.random(), Math.random(), Math.random()] );
  cSprite.scale.x = cSprite.scale.y = (Math.random() * 0.5) + 0.2;
  cSprite.velX = (Math.random() - 0.5) * 5.0;
  cSprite.velY = (Math.random() - 0.5) * 5.0;

  // http://codepen.io/ianmcgregor/pen/CtjeI?editors=0010 // Blend modes
  cSprite.blendMode = PIXI.blendModes.ADD;
  circles.push(cSprite);
  container.addChild(cSprite);
}

var count = 0;
// lets create moving shape
var path = new PIXI.Graphics();
container.addChild(path);
path.position.x = renderSize / 2;
path.position.y = renderSize / 2;


// load an image
var marioTex = PIXI.Texture.fromImage('assets/mario.png');
var mario = new PIXI.Sprite( marioTex );
mario.anchor = new PIXI.Point( 0.5, 0.5 );
container.addChild( mario );


// -----------------------------------------------------------------------------
//
// UPDATE DRAWING HERE
//
// -----------------------------------------------------------------------------

window.addEventListener('update', function (e) {


  square.rotation += 0.02;
  square.position.x += 3.0;

  if( square.position.x > renderSize + 200 ){
    square.position.x = -200;
  }

  for( var i = 0; i < circles.length; i++ ){
    var circle = circles[i];
    var circleSize = circle.width;
    circle.position.x += 0.5;
    circle.position.y += 0.5;

    if(circle.position.x > renderSize ){
      circle.position.x = -circleSize;
    }else if(circle.position.x < -circleSize ){
      circle.position.x = renderSize;
    }

    if(circle.position.y > renderSize ){
      circle.position.y = -circleSize;
    }else if(circle.position.y < -circleSize ){
      circle.position.y = renderSize;
    }
  }



  path.clear();
  path.lineStyle(30, 0xff0000, 1);


  path.moveTo(0, Math.sin(count) * -50 );
  path.lineTo(100, Math.sin(count) * 50 );
  path.lineTo(200, Math.sin(count) * -50 );
  path.lineTo(300, Math.sin(count) * 50 );
  path.rotation += 0.01;

  var range = 100;
  path.beginFill(0xffFF00, 0.5);
  path.moveTo(-120 + Math.sin(count) * range, -100 + Math.cos(count)* range);
	path.lineTo(120 + Math.cos(count) * range, -100 + Math.sin(count)* range);
	path.lineTo(120 + Math.sin(count) * range, 100 + Math.cos(count)* range);
	path.lineTo(-120 + Math.cos(count)* range, 100 + Math.sin(count)* range);
	path.lineTo(-120 + Math.sin(count) * range, -100 + Math.cos(count)* range);

  mario.x = 150 + Math.cos( count ) * 100;
  mario.y = 150 + Math.sin( count ) * 200;
  mario.rotation -= 0.01;
  count += 0.05;
}, false);


// -----------------------------------------------------------------------------
// setup scene
// -----------------------------------------------------------------------------

// gui stuff
var sceneData = {
    mode: "default",
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
