var glslify = require('glslify'); // this has to be required separately for some reason

// REQUIREMENTS
var THREE = require('three')
  , ThreeScene = require('./ThreeScene.js')
  , PixelClubLogo = require('./PixelClubLogo.js');

// create a new ThreeJS Scene
var scene = new ThreeScene( "pixel-club-logo" );
scene.camera.position.z = 3;

// create a dim ambient light
var ambientLight = new THREE.AmbientLight( 0x222222 );
scene.add( ambientLight );

// and a brighter point light slightly off center
var pointLight = new THREE.PointLight( 0xffeedd, 1.2 );
pointLight.position.set( 1, 1, 1 );
scene.add( pointLight );

// spawn a SpinningCube object
var cube = new PixelClubLogo();

// add the cube to the scene
scene.add( cube );

// globalize a few variables for use in dev console
window.PixelClubLogo = PixelClubLogo;
window.scene = scene;
window.THREE = THREE;
