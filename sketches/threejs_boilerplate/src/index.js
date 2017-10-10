// REQUIREMENTS
var THREE = require('three')
  , ThreeScene = require('./ThreeScene.js')
  , SpinningCube = require('./SpinningCube.js');

// create a new ThreeJS Scene
var scene = new ThreeScene();

// create a dim ambient light
var ambientLight = new THREE.AmbientLight( 0x555555 );
scene.add( ambientLight );

// and a brighter point light slightly off center
var pointLight = new THREE.PointLight( 0xffeedd );
pointLight.position.set( 0, 5, 2 );
scene.add( pointLight );

var cube = new SpinningCube();
scene.add( cube );

// globalize a few variables for use in dev console
window.scene = scene;
window.THREE = THREE;
