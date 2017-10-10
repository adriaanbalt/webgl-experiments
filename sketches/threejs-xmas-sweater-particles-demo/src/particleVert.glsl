#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform float uTime;
uniform float uDPR;
varying vec2 vUv;
varying vec2 vPosition;

void main() {

  vUv = uv;
  vPosition = position.xy;

  // set the point size based on the device pixel ratio
  gl_PointSize = 10. * uDPR;
  
  float yGrad = max( sin(position.y * 3.14) * ( .5 + position.y ), 0. );
  vec3 newPos = vec3( position.x + yGrad * snoise2( position.xy * 8. ) * .25, position.y + yGrad * abs(snoise2( vec2( position.xy * 3. )) * .05 ), position.z);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.);

}
