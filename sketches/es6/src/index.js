import { glslify } from 'glslify'; // this has to be required separately for some reason

// REQUIREMENTS
import THREE from 'three';

import {ThreeScene} from './ThreeScene.js';
import SpinningCube from './SpinningCube';

// create a new ThreeJS Scene
let scene = new ThreeScene();

// create a dim ambient light
let ambientLight = new THREE.AmbientLight( 0x555555 );
scene.add( ambientLight );

// and a brighter point light slightly off center
let pointLight = new THREE.PointLight( 0xffeedd );
pointLight.position.set( 0, 5, 2 );
scene.add( pointLight );

var mat = new THREE.MeshPhongMaterial({
	color: 0xeeeeee
});

var mat = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  shininess: 100,
  map: THREE.ImageUtils.loadTexture('assets/textures/concrete-wall.jpg'),
  bumpMap: THREE.ImageUtils.loadTexture('assets/textures/concrete-wall_BUMP.jpg'),
  bumpScale: 0.012,
  specularMap: THREE.ImageUtils.loadTexture('assets/textures/concrete-wall_BUMP.jpg'),
  // shading: THREE.FlatShading
  // wireframe: true
});


var geo = new THREE.BoxGeometry( 1, 1, 1 );

for ( var i = 0; i < 10; i++ ){
	scene.add( new SpinningCube( geo, mat ) );
}

// globalize a few letiables for use in dev console
window.scene = scene;
window.THREE = THREE;
