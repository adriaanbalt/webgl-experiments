// REQUIREMENTS
var PIXI = require('pixi.js')
  , PixiScene = require('./PixiScene.js')
  , _ = require('underscore')
  , dat = require('dat-gui')
  , tinycolor = require('tinycolor2');

var scene = new PixiScene( {canvasId: "gameCanvas"} ),                                                    // create a new PixiJS Scene
    container = new PIXI.Container();                                           // the container for the graphics

scene.stage.addChild( container );

// var filter = new PIXI.filters.PixelateFilter();
// filter.size = 1000;
// scene.stage.filters = [filter];

// -----------------------------------------------------------------------------
//
// START DRAWING HERE
//
// -----------------------------------------------------------------------------

var brick, platform;                          // graphic vars
var paddle, ball, gamebricks = [];            // game piece vars
var brickContainer = new PIXI.Container();    // container for bricks
var started = false;                          // game state vars
var brickSize = new PIXI.Point( 64, 64 );

// -----------------------------------------------------------------------------
// define some visuals
// -----------------------------------------------------------------------------
var Brick = function( x, y ) {
  var shape = new PIXI.Sprite( brick );
  shape.width = brickSize.x;
  shape.height = brickSize.y;
  shape.position = new PIXI.Point( x, y );
  this.shape = shape;
}

Brick.prototype.kill = function() {
  this.dead = true;
  this.shape.alpha = 0.1;
}

// -----------------------------------------------------------------------------
// load sprite sheet
// -----------------------------------------------------------------------------
PIXI.loader
    .add('assets/sprites.json')
    .load(onAssetsLoaded);

// when assets are loaded
function onAssetsLoaded()
{
  // define graphics
  brick = PIXI.Texture.fromFrame( 'white-brick.gif' );
  platform = PIXI.Texture.fromFrame( 'platform.gif' );
  fireball = PIXI.Texture.fromFrame( 'fire-ball.gif' );
  makeBoard();
}

// -----------------------------------------------------------------------------
// build game board
// -----------------------------------------------------------------------------
function makeBoard()
{
  // add all the bricks
  var rows = 6;
  var cols = Math.floor( this.scene.width / brickSize.x );
  _.times( cols, function( i ){
    _.times( rows, function( j ) {

      // create a new brick
      var x = i * brickSize.x + ( j%2 == 0  ? 0 : brickSize.x / 2);
      var brick = new Brick( x, j * brickSize.y );
      gamebricks.push( brick );

      // add the brick to the stage
      var color = hsvToInt( { h: Math.floor( 255 / rows) * j, s: 100, v: 75 } );
      brick.shape.tint = color;
      brickContainer.addChild( brick.shape );
    }, this );
  }, this );

  // make paddle
  paddle = new PIXI.Sprite( platform );
  paddle.anchor = new PIXI.Point( 0.5, 0.5 );
  paddle.position.x = scene.width / 2;
  paddle.position.y = scene.height - 40;

  // make ball graphic
  var ballGraphic = new PIXI.Graphics();
  ballGraphic.beginFill( 0xffffff );
  ballGraphic.drawRect( 0, 0, 15, 15 );
  ballGraphic.endFill();

  // add ball
  ball = new PIXI.Sprite( fireball );
  ball.position.x = scene.width / 2;
  ball.position.y = brickContainer.height + 40.0;
  ball.anchor = new PIXI.Point( 0.5, 0.5 );
  ball.velocity = new PIXI.Point( 0.0, 0.0 );
  ball.speed = 3.0;

  // add pieces to stage
  container.addChild( brickContainer );
  container.addChild( paddle );
  container.addChild( ball );
  // start game

  started = true;
}



// -----------------------------------------------------------------------------
//
// mouse interactions
//
// -----------------------------------------------------------------------------

var releaseBall = function(){
  if( !started )
    return;
  ball.position.x = scene.width / 2;
  ball.position.y = brickContainer.height + 40.0;
  ball.direction = new PIXI.Point( Math.random() * 2 - 1.0, 1.0 );
  ball.velocity = new PIXI.Point( ball.direction.x * ball.speed, ball.direction.y * ball.speed );
}

var movePaddle = function( obj ){
  if( !started )
    return;
  paddle.x = obj.data.global.x;
}

scene.stage.interactive = true;
scene.stage.on( 'mousedown', releaseBall );
scene.stage.on( 'mousemove', movePaddle );


// -----------------------------------------------------------------------------
//
// UPDATE DRAWING HERE
//
// -----------------------------------------------------------------------------
window.addEventListener('update', function (e) {
  if( !started )
    return;

  var ballBounds = ball.getBounds();

  // check paddle collision
  var hit = collisionTop( ballBounds, paddle.getBounds() );
  if( hit ){
    // where in the paddle they intersect
    var hitAngle = Math.PI * (ball.position.x - paddle.position.x) /
                              (paddle.getBounds().width * 0.5);
    // ball.speed += .5;
    ball.velocity.y *= -1.0;
    ball.velocity.x = Math.sin( hitAngle ) * ball.speed;
  }

  // check bounds
  // hit sides
  if ( ballBounds.x + ballBounds.width > scene.width){
    ball.velocity.x *= -1;
  } else if ( ballBounds.x < 0 ){
    ball.velocity.x *= -1;
  }

  // hit top
  if( ballBounds.y < 0 ){
    ball.velocity.y *= -1;
  }

  // check brick collision
  var count = 0;
  var hitBrick = false;
  while( !hitBrick && count < gamebricks.length ){

    var brick = gamebricks[count];
    var brickBounds = brick.shape.getBounds();

    // check for dead brick
    if( brick.dead ) {
      count++;
      continue;
    }

    // check collisions
    if( collisionBottom( ballBounds, brickBounds ) ||
        collisionTop( ballBounds, brickBounds ) ){
      ball.velocity.y *= -1;
      hitBrick = true;
    }
    if( collisionRight( ballBounds, brickBounds ) ||
        collisionLeft( ballBounds, brickBounds ) ){
      ball.velocity.x *= -1;
      hitBrick = true;
    }
  //
   // if brick collision
   if( hitBrick ) {
     brick.kill();
   }

    count++;
  }

  // move ball
  ball.position.x += ball.velocity.x;
  ball.position.y += ball.velocity.y;
  ball.rotation += .15;

}, false);


// -----------------------------------------------------------------------------
//
// Utility functions
//
// -----------------------------------------------------------------------------

var collisionTop = function( bounds1, bounds2 ){
  if( bounds1.y + bounds1.height > bounds2.y
    && bounds1.y < bounds2.y
    && bounds1.x > bounds2.x
    && bounds1.x < bounds2.x + bounds2.width ) {
    return true;
  }
  return false;
}
var collisionBottom = function( bounds1, bounds2 ){
  if( bounds1.y < bounds2.y + bounds2.height
    && bounds1.y + bounds1.height > bounds2.y + bounds2.height
    && bounds1.x > bounds2.x
    && bounds1.x < bounds2.x + bounds2.width ) {
    return true;
  }
  return false;
}
var collisionLeft = function( bounds1, bounds2 ){
  if( bounds1.x + bounds1.width > bounds2.x
    && bounds1.x < bounds2.x
    && bounds1.y > bounds2.y
    && bounds1.y < bounds2.y + bounds2.height ) {
    return true;
  }
  return false;
}
var collisionRight = function( bounds1, bounds2 ){
  if( bounds1.x < bounds2.x + bounds2.width
    && bounds1.x + bounds1.width > bounds2.x + bounds2.width
    && bounds1.y > bounds2.y
    && bounds1.y < bounds2.y + bounds2.height ) {
    return true;
  }
  return false;
}

var hsvToInt = function ( obj ){
  var color = tinycolor( obj ).toHexString();
  return parseInt(color.replace(/^#/, ''), 16);
}


// -----------------------------------------------------------------------------
// globalize a few variables for use in dev console
// -----------------------------------------------------------------------------

window.scene = scene;
window.PIXI = PIXI;
