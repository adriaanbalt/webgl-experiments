var THREE = require('three')
    inherits = require('inherits');

// define a standardized material for all PixelCubes to share
var mat = new THREE.MeshPhongMaterial({
  color: 0x3399ff,
  // map: THREE.ImageUtils.loadTexture('assets/textures/uv.jpg'),
  shininess: 25
});

// constructor
var PixelCube = function( CUBE_SIZE, CUBE_MARGIN ) {

  // create a 1m cube geometry specific to this instance of SpinningCube
  var geo = new THREE.BoxGeometry( CUBE_SIZE - CUBE_MARGIN,  CUBE_SIZE - CUBE_MARGIN,  CUBE_SIZE - CUBE_MARGIN );

  // make a random seed for this pixel
  this.rand = Math.random();

  // super
  THREE.Mesh.call( this, geo, mat );

};

// extend the standard THREE.Mesh
inherits( PixelCube, THREE.Mesh );

// define an update function to be called on the cube each frame
PixelCube.prototype.update = function( time ) {

  // roll the scale value in a sine wave along the y axis
  var s = Math.abs( Math.sin( time + this.position.y ) ) * .75 + .25;
  this.scale.set(s,s,s);

}

module.exports = PixelCube;
