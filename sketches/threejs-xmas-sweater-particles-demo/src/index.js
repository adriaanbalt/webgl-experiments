var glslify = require('glslify'); // this has to be required separately for some reason

// REQUIREMENTS
var _ = require('underscore')
  , $ = require('jquery')
  , THREE = require('three')
  , ThreeScene = require('./ThreeScene.js');

$(document).ready( function() {

  var ts = new ThreeScene();
  ts.camera.position.z = 1;

  var vertShader = glslify("./particleVert.glsl");
  var fragShader = glslify("./particleFrag.glsl");

  var sweaterTex = THREE.ImageUtils.loadTexture( "assets/textures/christmas-sweater-texture.png" );
  sweaterTex.wrapS = sweaterTex.wrapT = THREE.RepeatWrapping;
  sweaterTex.magFilter = sweaterTex.minFilter = THREE.NearestFilter;

  // create a shader material
  var particleMat = new THREE.ShaderMaterial( {
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      "uTime": { type: "f", value: 0.0 },
      "uDPR": { type: "f", value: window.devicePixelRatio },
      "tDiffuse": { type: "t", value: sweaterTex },
      "tParticle": { type: "t", value: THREE.ImageUtils.loadTexture( "assets/textures/snowflakes.png" ) }
    },
    vertexShader: vertShader,
    fragmentShader: fragShader
  } );

  // create plane of vertices 256x128 wide
  var points = new THREE.Points( new THREE.PlaneBufferGeometry(2,1,256,128), particleMat );

  // any Object3D with an update function will be called each frame
  points.update = function() {
    particleMat.uniforms['uTime'].value++;
  }

  ts.scene.add( points );

} );
