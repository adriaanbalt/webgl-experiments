var _ = require('underscore')
  , inherits = require('inherits')
  , THREE = require('three');

window.THREE = window.THREE || THREE;

// Load Three.js and make it a global to use common plugins
var TrackballControls = require('./threejs/controls/TrackballControls.js');

// ThreeScene constructor
var ThreeScene = function() {

  // super
  THREE.Scene.call( this );

  this.setup();
  this.animate();
}

// extend the standard THREE.Mesh
inherits( ThreeScene, THREE.Scene );

// setup function
ThreeScene.prototype.setup = function() {

  // add some unused fog by default
  // this.fog = new THREE.FogExp2( 0x000000, .07 );

  console.log ( 'window.innerWidth / window.innerHeight', window.innerWidth / window.innerHeight );
  // create the camera
	this.camera = new THREE.PerspectiveCamera( 150, window.innerWidth / window.innerHeight, .5, 1000);

  // pull back from the center by 5 meters
  this.camera.position.z = 15;

  // configure the lens (50mm lens on 35mm camera)
	this.camera.setLens(50, 43.25);

  // add the camera to the scene
	this.add( this.camera );

  // setup trackball controls with some sane defaults
  this.controls = new THREE.TrackballControls( this.camera );
  this.controls.rotateSpeed = 3.0;
  this.controls.zoomSpeed = 1.2;
  this.controls.panSpeed = 0.8;
  this.controls.dynamicDampingFactor = 0.3;

  // create the renderer
  this.renderer = new THREE.WebGLRenderer();

  // enable retina resolution if available
  this.renderer.setPixelRatio( window.devicePixelRatio || 1 );

  // set the renderer to be the full size of our browser window
  this.renderer.setSize( window.innerWidth, window.innerHeight );

  // create a clock for this scene
  this.clock = new THREE.Clock( true );

  // subscribe to resize events
  window.addEventListener( 'resize', this.onWindowResize.bind( this ), false );

  // add the Three.js canvas to the document
  document.body.appendChild( this.renderer.domElement );

}

// browser resize handler
ThreeScene.prototype.onWindowResize = function(){

  // update camera
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();

  // update renderer
  this.renderer.setSize( window.innerWidth, window.innerHeight );

}

// animate function - gets calls each frame
ThreeScene.prototype.animate = function() {

  // get the time elapsed since the start of the scene
  var delta = this.clock.getDelta();
  var time = this.clock.getElapsedTime();

  // update any children with an 'update' method defined, and pass them the
  // time elapsed since the start of the scene, if they need it
  this.traverse( function( child ) {
    if( child.update !== undefined ) child.update( time, delta );
  }.bind( this ) );

  // update the trackball controls
  this.controls.update();

  // render the scene
  this.renderer.render( this, this.camera );

  // subscribe to the next frame event
  requestAnimationFrame( this.animate.bind( this ) );

}


module.exports = ThreeScene;
