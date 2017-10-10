var _ = require('underscore')
  , THREE = require('three');

var ThreeScene = function() {
  this.setup();
  this.animate();
}

// setup function
ThreeScene.prototype.setup = function() {

  // create the scene
  this.scene = new THREE.Scene();

  // create the camera
	this.camera = new THREE.PerspectiveCamera( 28, window.innerWidth / window.innerHeight, .001, 500000 );
	this.camera.position.z = 5;
	this.camera.setLens(8, 7.49); // 16mm bolex

	this.scene.add( this.camera );

  // create the renderer
  this.renderer = new THREE.WebGLRenderer();

  // enable retina resolution if available
  this.renderer.setPixelRatio( window.devicePixelRatio || 1 );

  // set the renderer to be the full size of our browser window
  this.renderer.setSize( window.innerWidth, window.innerHeight );

  // add canvas to the document
  document.body.appendChild( this.renderer.domElement );

}

// render function
ThreeScene.prototype.render = function() {

  this.renderer.clear();
  this.renderer.render( this.scene, this.camera );

}

// animate function - gets calls each frame
ThreeScene.prototype.animate = function(time) {

  // update anything we've put on the stack with an 'update' method
  _.each( this.scene.children, function( child ) {
    if( child.update !== undefined ) child.update();
  });

  // render our scene
  this.render();

  // bind to next frame event
  requestAnimationFrame( this.animate.bind( this ) );

}

// add function - maps to local scene add function
ThreeScene.prototype.add = function( child ) {
  this.scene.add( child );
}

module.exports = ThreeScene;
