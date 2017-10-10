var THREE = require('three')
  , inherits = require('inherits');

// Define a Phong-based rust material
var RustMaterial = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  shininess: 75,
  map: THREE.ImageUtils.loadTexture('assets/textures/RustMixed0076_1_S.jpg'),
  bumpMap: THREE.ImageUtils.loadTexture('assets/textures/RustMixed0076_1_S_BUMP.jpg'),
  bumpScale: 0.003,
  specularMap: THREE.ImageUtils.loadTexture('assets/textures/RustMixed0076_1_S_SPEC.jpg'),
  // emissiveMap: THREE.ImageUtils.loadTexture('assets/textures/RustMixed0076_1_S_EMIT.jpg'),
  // emissive: 0xffffff,
  // transparent: true,
  // side: THREE.DoubleSide
  // shading: THREE.FlatShading
  // wireframe: true
});

module.exports = RustMaterial;
