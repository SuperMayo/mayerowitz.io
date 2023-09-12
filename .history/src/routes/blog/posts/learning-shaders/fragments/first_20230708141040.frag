uniform vec2 resolution;

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Red increases in the x direction and green increases in the y direction
    gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}