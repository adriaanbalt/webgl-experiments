var THREE = require('three')
  , inherits = require('inherits');

// Define a Phong-based rust material
var ConcreteMaterial = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  shininess: 55,
  map: THREE.ImageUtils.loadTexture('assets/textures/concrete-wall.jpg'),
  bumpMap: THREE.ImageUtils.loadTexture('assets/textures/concrete-wall_BUMP.jpg'),
  bumpScale: 0.0013,
  specularMap: THREE.ImageUtils.loadTexture('assets/textures/concrete-wall_SPEC.jpg'),
  // emissiveMap: THREE.ImageUtils.loadTexture('assets/textures/RustMixed0076_1_S_EMIT.jpg'),
  // emissive: 0xffffff,
  // transparent: true,
  // side: THREE.DoubleSide
  // shading: THREE.FlatShading
  // wireframe: true
});

module.exports = ConcreteMaterial;
