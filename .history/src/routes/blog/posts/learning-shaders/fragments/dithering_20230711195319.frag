uniform vec2 resolution;
uniform float u_step;

// 4x4 Bayer matrix for ordered dithering
const mat4 bayerMatrix = mat4(
    0.0/16.0, 8.0/16.0, 2.0/16.0, 10.0/16.0,
    12.0/16.0, 4.0/16.0, 14.0/16.0, 6.0/16.0,
    3.0/16.0, 11.0/16.0, 1.0/16.0, 9.0/16.0,
    15.0/16.0, 7.0/16.0, 13.0/16.0, 5.0/16.0);

float noise(vec2 uv) {
    return fract(sin(dot(uv.xy, vec2(12.1298, 78.233))) * 43758.5453);
}

void main () {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    float color = 1. - uv.x;
    float dither = bayerMatrix[int(gl_FragCoord.x/1.) % 4][int(gl_FragCoord.y/1.) % 4];
    float dithered = step(noise(uv), color);
    float t = step(0.5, uv.y);

    color = t * color + (1. - t) * dithered;

    gl_FragColor = vec4(vec3(color), 1.0);
}