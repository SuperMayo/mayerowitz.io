uniform vec2 resolution;
varying vec2 vUv;

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy) / resolution.xy;

    // distance of the current pixel from the center of the screen
    // 1 - distance to get brighter in the center
    float d = 1. - distance(uv, vec2(0.5)) * 2.;

    // Increase luminosity with distance to center
    gl_FragColor = vec4(vec3(d), 1.0); //RGBA
}