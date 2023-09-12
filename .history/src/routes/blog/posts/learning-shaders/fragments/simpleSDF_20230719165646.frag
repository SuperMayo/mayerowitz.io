uniform vec2 u_resolution;
uniform float u_slider;
uniform float u_time;
varying vec2 vUv;

void main() {
    // distance of the current pixel from the center of the screen
    // 1 - distance to get brighter in the center
    float d = 1. - distance(vUv, vec2(0.5)) * 2.;

    // Using step to get a sharp circle
    float c = step(0.5, d);

    // Mix the two colors based on the slider
    float o = mix(d, c, u_slider);

    // Increase luminosity with distance to center
    gl_FragColor = vec4(vec3(o), 1.0); //RGBA
}