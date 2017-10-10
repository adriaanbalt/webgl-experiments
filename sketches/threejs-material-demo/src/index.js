var glslify = require('glslify'); // this has to be required separately for some reason

// REQUIREMENTS
var THREE = require('three')
  , ThreeScene = require('./ThreeScene.js')
  , SpinningSphere = require('./SpinningSphere.js')
  , BallLight = require('./BallLight.js')
  , RustMaterial = require('./materials/RustMaterial.js')
  , ConcreteMaterial = require('./materials/ConcreteMaterial.js')
  , MoonMaterial = require('./materials/MoonMaterial.js')
  , WoodMaterial = require('./materials/WoodMaterial.js')
  , dat = require('dat-gui');

// create a new ThreeJS Scene
var scene = new ThreeScene();

// create a dim ambient light
var ambientLight = new THREE.AmbientLight( 0x222222 );
scene.add( ambientLight );

// skylight
// var skyLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
// scene.add( skyLight );

// and a brighter point light slightly off center
var pointLight = new BallLight( 0xffeeee, 1 );
pointLight.position.set( -5, 5, 8 );
scene.add( pointLight );

// create a rotating sphere we can texture
var sphere = new SpinningSphere();
// sphere.material = RustMaterial;
// sphere.material = ConcreteMaterial;
sphere.setMaterial = "";
scene.add( sphere );

// initialize the gui
var gui = new dat.GUI();

// set placeholders for various material controls
var controls = {};
controls.shininess = gui.add( sphere.material, 'shininess', 0, 300);
controls.bumpScale = gui.add( sphere.material, 'bumpScale', 0, .1);

// A bit hack, but lets us pick one of our custom materials from a dropdown
// uses the oft maligned and misunderstood eval tag.
var matControls = gui.add(sphere, 'setMaterial', [ 'MoonMaterial','RustMaterial', 'ConcreteMaterial', 'WoodMaterial']);
matControls.onFinishChange(function(value) {
  // Fires on every change, drag, keypress, etc.
  sphere.material = eval(value);

  if( controls.shininess !== undefined ) gui.remove( controls.shininess );
  controls.shininess = gui.add( sphere.material, 'shininess', 0, 300);

  if( controls.bumpScale !== undefined ) gui.remove( controls.bumpScale );
  controls.bumpScale = gui.add( sphere.material, 'bumpScale', 0, .1);
});


// globalize a few variables for use in dev console
window.scene = scene;
window.THREE = THREE;
