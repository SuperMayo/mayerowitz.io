uniform float u_slider;
varying vec2 vUv;

void main() {
    vec2 st = vUv;

    // distance of the current pixel to the center of the canvas
    // 1 - distance to get brighter in the center
    float d = distance(st, vec2(0.5));

    // Using step to get a sharp circle
    // c = 1 if d > 0.5, 0 otherwise
    float s = 1. - step(0.5, d);

    // Mix the two colors based on the slider
    float brightness = mix(d, s, u_slider);

    gl_FragColor = vec4(vec3(brightness), 1.0); //RGBA
}