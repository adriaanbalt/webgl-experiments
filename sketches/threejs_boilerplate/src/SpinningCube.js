var THREE = require('three')
  , inherits = require('inherits');

// define a standardized material for all SpinningCubes to share
var mat = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  // map: THREE.ImageUtils.loadTexture('assets/textures/uv.jpg'),
  shininess: 1
});

// create a standard 1m cube geometry to be used by all
// instances of SpinningCube spawned
var geo = new THREE.BoxGeometry( 1, 1, 1 );

// constructor
var SpinningCube = function( ) {

  // super
  THREE.Mesh.call( this, geo, mat );

};

// extend the standard THREE.Mesh
inherits( SpinningCube, THREE.Mesh );

// define a custom update function to be called on the cube each frame
SpinningCube.prototype.update = function( time ) {
  this.rotation.x += .5 * Math.PI / 180;
  this.rotation.y += .2 * Math.PI / 180;
}

module.exports = SpinningCube;
