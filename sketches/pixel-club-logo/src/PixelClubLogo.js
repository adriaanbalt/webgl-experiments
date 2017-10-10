var THREE = require('three')
    inherits = require('inherits')
    PixelCube = require('./PixelCube.js');

// define the position for pixel club cubes
var PIXEL_IMAGE_URL = 'assets/pixel-club-logo.png'
  , CHANNEL_COUNT = 4
  , CUBE_SIZE = .1
  , CUBE_MARGIN = .02;

// constructor
var PixelClubLogo = function( ) {

  // create an image element to load and process logo pixels
  this.img = document.createElement('img');

  // load the image and set a callback to
  this.img.onload = this.processPixelImage.bind(this);
  this.img.src = PIXEL_IMAGE_URL;

  // super
  THREE.Object3D.call( this );

};

// extend the standard THREE.Object3D
inherits( PixelClubLogo, THREE.Object3D );

// define a helper function to read the source image
PixelClubLogo.prototype.processPixelImage = function() {

  // create a canvas element to read our image's pixel values
  var canvas = document.createElement('canvas');

  var ctx = canvas.getContext('2d');

  // draw the image onto the canvas starting in the top left
  ctx.drawImage( this.img, 0, 0 );

  // and retrieve an array of its pixel data
  var pixelArray = ctx.getImageData(0,0,this.img.width,this.img.height).data;

  // loop through pixel data and create PixelCube objects for any black pixels
  for( var y = 0; y < this.img.height; y++ ) {
    for( var x = 0; x < this.img.width; x++ ) {
      if( pixelArray[ x * CHANNEL_COUNT + ( y * this.img.width * CHANNEL_COUNT ) ] == 0 ) {
        // create a PixelCube
        var c = new PixelCube( CUBE_SIZE, CUBE_MARGIN );
        c.position.set( ( x * CUBE_SIZE ) - ( CUBE_SIZE * this.img.width * .5 ), -y * CUBE_SIZE +  ( CUBE_SIZE * this.img.height * .5 ), 0 );
        this.add( c );
      }
    }
  }



};

// define an update function to be called on the cube each frame
PixelClubLogo.prototype.update = function( time ) {
  this.rotation.y = .25 * Math.sin( time );
  this.rotation.x = .25 * Math.sin( time * .68 );
}

module.exports = PixelClubLogo;
