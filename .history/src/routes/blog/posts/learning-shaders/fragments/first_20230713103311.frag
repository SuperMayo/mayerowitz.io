uniform vec2 resolution;

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Pixel perfect resolution
    float pixelSize = 10.0 / resolution.x;
    vec2 pixelCenter = gl_FragCoord.xy + pixelSize / 2.0;

    // Red increases in the x direction and green increases in the y direction
    float red = floor(pixelCenter.x);
    float green = floor(pixelCenter.y);
    
    // Ensure that the red and green values are always between 0 and 9
    red = clamp(red, 0., 9.);
    green = clamp(green, 0., 9.);

    // Set the final color
    gl_FragColor = vec4(red, green, 0., 1.);
}