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
var geo = new THREE.BoxGeometry( .5, .5, .5 );

var GRAVITY = new THREE.Vector3(0, -1.97, 0)
  , FLOOR = -5
  , CEILING = 5;

// constructor
var SpinningCube = function( ) {

  // super
  THREE.Mesh.call( this, geo, mat );

  this.position.x = (Math.random() - 0.5) * 10;
  this.position.y = (Math.random()) * 10;
  this.position.z = (Math.random() - 0.5) * 10;
  this.vel = new THREE.Vector3();
  this.rotVel = new THREE.Vector3( Math.random() - .5, Math.random() - .5, Math.random() - .5 );
};

// extend the standard THREE.Mesh
inherits( SpinningCube, THREE.Mesh );

// define a custom update function to be called on the cube each frame
SpinningCube.prototype.update = function( time, delta ) {

  if( delta > 0.1 ) {
    delta = 0.1;
  }

  // apply gravity
  this.vel.add( GRAVITY.clone().multiplyScalar( delta * .01 ) );
  this.position.add( this.vel );

  if( this.position.y < FLOOR) {
    // this.position.y = CEILING;
    this.vel.multiplyScalar(-1);
  }

  this.rotation.x += this.rotVel.x * Math.PI / 180;
  this.rotation.y += this.rotVel.y * Math.PI / 180;
}

module.exports = SpinningCube;
