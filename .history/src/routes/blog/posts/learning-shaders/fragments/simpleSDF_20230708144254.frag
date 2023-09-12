uniform vec2 resolution;

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord * 2.0 - resolution.xy) / resolution.y;

    // distance of the current pixel from the center of the screen
    float d = distance(uv, vec2(0.5));

    // Red increases in the x direction and green increases in the y direction
    gl_FragColor = vec4(vec3(d), 1.0); //RGBA
}