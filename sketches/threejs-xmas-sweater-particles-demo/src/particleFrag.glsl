precision highp float;
uniform float uTime;
uniform sampler2D tDiffuse;
uniform sampler2D tParticle;
varying vec2 vUv;
varying vec2 vPosition;

void main() {

  vec4 c = texture2D( tDiffuse, vec2( ( vUv.x * 2. ), vUv.y + uTime * .005 ) );
  vec4 part = texture2D( tParticle, vec2( gl_PointCoord.x / 16., gl_PointCoord.y / 16. ) );

  gl_FragColor = vec4( part.rgb, c.r * part.r );

}
