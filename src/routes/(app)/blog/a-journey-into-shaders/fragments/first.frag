varying vec2 vUv;

void main() {
  // Normalized pixel coordinates (from 0 to 1)
  vec2 st = vUv;

  // redish in x, greenish in y
  // Try to modify the following line to have a blue gradient
  // from left to right.
  gl_FragColor = vec4(st.x, st.y, 0.0, 1.0); // RGBA
}