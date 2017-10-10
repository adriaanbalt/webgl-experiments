var THREE = require('three')
  , inherits = require('inherits');


// create a standard 1m cube geometry to be used by all
// instances of BallLight spawned
var geo = new THREE.SphereGeometry( 0.5, 8, 8 );

// constructor
var BallLight = function( color, brightness ) {

  // super
  THREE.Object3D.call( this );

  if( brightness === undefined ) {
    var brightness = 1.0;
  }

  // define a material for the visible part of this light (pure emission)
  var lightmat = new THREE.MeshBasicMaterial({
    color: color
  });

  var lightObj = new THREE.Mesh( geo, lightmat );
  this.add( lightObj );

  // create a point light
  var light = new THREE.PointLight( color, brightness )
  this.add( light );



};

// extend the standard THREE.Mesh
inherits( BallLight, THREE.Object3D );

// define a custom update function to be called on the cube each frame
BallLight.prototype.update = function( time ) {
  // this.rotation.x += .5 * Math.PI / 180;
  // this.rotation.y += .2 * Math.PI / 180;
}

module.exports = BallLight;
