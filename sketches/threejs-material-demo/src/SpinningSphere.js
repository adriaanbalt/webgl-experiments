var THREE = require('three')
  , inherits = require('inherits')
  , MoonMaterial = require('./materials/MoonMaterial.js');

// create a standard 1m cube geometry to be used by all
// instances of SpinningSphere spawned
var geo = new THREE.SphereGeometry( .5, 64, 32 );
// var geo = new THREE.BoxGeometry(1,1,1);

// constructor
var SpinningSphere = function( ) {

  // super
  THREE.Mesh.call( this, geo, MoonMaterial );


};

// extend the standard THREE.Mesh
inherits( SpinningSphere, THREE.Mesh );

// define a custom update function to be called on the cube each frame
SpinningSphere.prototype.update = function( time ) {
  // this.rotation.x += .5 * Math.PI / 180;
  this.rotation.y += .2 * Math.PI / 180;
}

module.exports = SpinningSphere;
