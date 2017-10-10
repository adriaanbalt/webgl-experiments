var THREE = require('three')
  , inherits = require('inherits');

// define a standardized material for all SpinningCubes to share



function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// create a standard 1m cube geometry to be used by all
// instances of SpinningCube spawned
// constructor
var SpinningCube = function( ) {

	var mat = new THREE.MeshPhongMaterial({
	  color: getRandomColor(),
	  // map: THREE.ImageUtils.loadTexture('assets/textures/uv.jpg'),
	  shininess: 1
	});
	var geo = new THREE.BoxGeometry( 1,1*Math.random(),1*Math.random() );

  // super
  THREE.Mesh.call( this, geo, mat );

  this.position.x = (Math.random() - .5 ) * 30;
  this.position.y = (Math.random() - .5 ) * 30;
  this.position.z = (Math.random() - .5 ) * 30;

  this.rot = Math.random();
};

// extend the standard THREE.Mesh
inherits( SpinningCube, THREE.Mesh );

// define a custom update function to be called on the cube each frame
SpinningCube.prototype.update = function( time ) {
  this.rotation.x += this.rot * Math.PI / 180;
  this.rotation.y += this.rot * Math.PI / 180;

  // this.position.z += .2;
  // if ( this.position.z > 100 ) this.position.z = -100;
}

module.exports = SpinningCube;
