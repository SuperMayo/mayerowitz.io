uniform vec2 resolution;
varying vec2 vUv;

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = vUv;

    // Red increases in the x direction
    // Green increases in the y direction
    gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0); //RGBA
}