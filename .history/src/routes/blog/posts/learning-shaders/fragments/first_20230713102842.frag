uniform vec2 resolution;

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Pixel perfect resolution
    float pixelSize = 1.0 / resolution.x;
    vec2 pixelCenter = gl_FragCoord.xy + pixelSize / 2.0;
    float color = uv.x * step(pixelCenter.x, pixelSize);


    // Red increases in the x direction and green increases in the y direction
    gl_FragColor = vec4(color, 0.0, 0.0, 1.0); //RGBA
}