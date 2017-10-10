// REQUIREMENTS
var  PIXI = require('pixi.js')
  , _ = require('underscore')
  , PixiScene = require('./PixiScene.js')
  , pixiUtils = require('./pixi/utils.js')
  , inherits = require('inherits')
  , SimplexNoise = require('simplex-noise')
  , math = require('mathjs');

// create a new PixiJS Scene
var scene = new PixiScene(),                                                    // create a new PixiJS Scene
    container = new PIXI.Container();                                           // the container for the graphics

var width = scene.width;
var height = scene.height;

scene.stage.addChild( container );

// -----------------------------------------------------------------------------
// Vec2 - Vector Object
// -----------------------------------------------------------------------------

var Vec2 = function(x, y){
    this.x = x;
    this.y = y;
}
inherits( Vec2, PIXI.Point );

Vec2.prototype.add = function( vec ){
    this.x += vec.x;
    this.y += vec.y;
}

Vec2.prototype.sub = function( vec ){
    this.x -= vec.x;
    this.y -= vec.y;
}

Vec2.prototype.mult = function( n ){
    this.x *= n;
    this.y *= n;
}

Vec2.prototype.div = function( n ){
    this.x /= n;
    this.y /= n;
}

Vec2.prototype.mag = function() {
    var mag = Math.sqrt( this.x * this.x + this.y * this.y );
    return mag;
}

Vec2.prototype.normalize = function() {
    var m = this.mag();
     if ( m > 0 ) {
       this.div( m );
     }
}

Vec2.prototype.limit = function( max ) {
    if( this.mag() > max ) {
      this.normalize();
      this.mult( max );
    }
}

Vec2.sub = function(v1, v2) {
    return new Vec2(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
 };

// -----------------------------------------------------------------------------
// Mover Object
// -----------------------------------------------------------------------------

var Mover = function(){
    this.location = new Vec2( math.random(width), math.random(height) );
    this.velocity = new Vec2( math.random(-5, 5), math.random(-5, 5) );
    // this.velocity = new Vec2( 0, 0 );
    // this.acceleration = new Vec2( -0.001,0.1 );
    this.circle = pixiUtils.makeCircle( location.x, location.y, 16.0 );
}

Mover.prototype.update = function(){
    /*var mouse = new Vec2( scene.mousePosition.x, scene.mousePosition.y );
    var dir = Vec2.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.5);
    this.acceleration = dir;
    this.velocity.add( this.acceleration );
    // this.velocity.limit( 10.0 );*/
    this.location.add( this.velocity );
}

Mover.prototype.draw = function(){
    this.circle.position.x = this.location.x;
    this.circle.position.y = this.location.y;
}

Mover.prototype.checkEdges = function(){
    if ( this.location.x > width) {
      this.location.x = 0;
  } else if (this.location.x < 0) {
      this.location.x = width;
    }

    if (this.location.y > height) {
      this.location.y = 0;
  } else if (this.location.y < 0) {
      this.location.y = height;
    }
}

// -----------------------------------------------------------------------------
// EXAMPLES START HERE
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Ex.1 Pure randomness
// -----------------------------------------------------------------------------

var graphics = new PIXI.Graphics();
var simplex = new SimplexNoise(Math.random);
graphics.moveTo( 0, 250 );
graphics.lineStyle( 1, 0xffffff );
_.times( math.floor(width/10), function( i ){
    var y = math.random( 0, 500 );
    console.log(y);
    graphics.lineTo( i * 10, y );
}, this );
container.addChild( graphics );



// -----------------------------------------------------------------------------
// Ex.2 1D Perlin Noise
// -----------------------------------------------------------------------------
/*
var graphics = new PIXI.Graphics();
var simplex = new SimplexNoise(Math.random);
graphics.moveTo( 0, 250 );
graphics.lineStyle( 1, 0xffffff );
_.times( math.floor(width/10), function( i ){
    var y = (simplex.noise2D( i * 0.05, 0 ) * 250.0) + 250.0;
    console.log(y);
    graphics.lineTo( i * 10, y );
}, this );
container.addChild( graphics );
*/


// -----------------------------------------------------------------------------
// Ex3 2D Perlin Noise
// -----------------------------------------------------------------------------
/*
var graphics = new PIXI.Graphics();
var simplex = new SimplexNoise(Math.random);
_.times( 400, function( i ){
    _.times( 400, function( j ){
        var inputX = i;
        var inputY = j;
        var val = ( ( simplex.noise2D( inputX, inputY ) * 0.5 ) + 0.5 ) * 255;
        graphics.beginFill( pixiUtils.rgbToInt( {r: val, g: val, b: val} ) );
        graphics.drawRect(i, j, 1, 1);
        graphics.endFill();
    }, this );
}, this );
container.addChild( graphics );
*/


// -----------------------------------------------------------------------------
// Ex.4 Non Vector animation
// -----------------------------------------------------------------------------
/*
var x = width/2;
var y = height/2;
var circle = pixiUtils.makeCircle( 0, 0, 20.0);
container.addChild( circle );

window.addEventListener('update', function (e) {

    // Move the ball according to its speed.
    x = x + xspeed;
    y = y + yspeed;

    // Check for bouncing.
    if ((x > width) || (x < 0)) {
        xspeed = xspeed * -1;
      }
      if ((y > height) || (y < 0)) {
        yspeed = yspeed * -1;
    }

    circle.position.x = x
    circle.position.y = y;
});
*/

// -----------------------------------------------------------------------------
// Ex.5 Vector animation
// -----------------------------------------------------------------------------
/*
var location = new Vec2( width/2, height/2 );
var velocity = new Vec2( math.random( -5.0, 5.0 ), math.random( -5.0, 5.0 ) );
var circle = pixiUtils.makeCircle( 0, 0, 20.0 );
circle.position = location;
container.addChild( circle );

window.addEventListener('update', function (e) {

    // Move the ball according to its speed.
    // location.x += velocity.x;
    // location.y += velocity.y;
    location.add(velocity);
    if ((location.x > width) || (location.x < 0)) {
        velocity.x = velocity.x * -1;
    }
    if ((location.y > height) || (location.y < 0)) {
        velocity.y = velocity.y * -1;
    }

    circle.position = location;
});
*/

// -----------------------------------------------------------------------------
// Ex.6 Vector Scaling
// -----------------------------------------------------------------------------
/*
var center = new Vec2( width/2, height/2 );
var graphics = new PIXI.Graphics();
container.addChild( graphics );

window.addEventListener('update', function (e) {

    // get mouse position
    var mouse = new Vec2( scene.mousePosition.x, scene.mousePosition.y );
    mouse.sub( center );    // get length from 0
    mouse.mult( 0.5 );      // scale vector

    var location = new Vec2( center.x, center.y )
    location.add( mouse );

    graphics.clear();
    graphics.lineStyle( 2, 0xffffff );
    graphics.moveTo( center.x, center.y);
    graphics.lineTo( location.x, location.y);
});
*/

// -----------------------------------------------------------------------------
// Ex.7 Mover Example
// -----------------------------------------------------------------------------
/*
var mover = new Mover();
container.addChild( mover.circle );

window.addEventListener('update', function (e) {

    mover.update();
    mover.checkEdges();
    mover.draw();
});*/


// -----------------------------------------------------------------------------
// Ex.8 Acceleration towards Mouse
// -----------------------------------------------------------------------------
/*
var mover = new Mover();
container.addChild( mover.circle );
window.addEventListener('update', function (e) {
    mover.update();
    mover.checkEdges();
    mover.draw();
});
*/

// -----------------------------------------------------------------------------
// Ex.9 Array of Movers
// -----------------------------------------------------------------------------
/*
var movers = [];
for (var i = 0; i < 20; i++) {
    var mover = new Mover();
    movers.push( mover );
    container.addChild( mover.circle );
}

window.addEventListener('update', function (e) {
    _.each( movers, function( mover ){
        mover.update();
        mover.checkEdges();
        mover.draw();
    }, this);
});
*/

// globalize a few variables for use in dev console
window.scene = scene;
window.PIXI = PIXI;
