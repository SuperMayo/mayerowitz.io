uniform vec2 resolution;
uniform float u_step;

float sdSphere(vec2 uv, vec2 center, float size)
{
  return 1.0 - distance(uv, center) / size;
}

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy) / resolution.xy;

    // distance of the current pixel from the center of the screen
    // 1-distance to get brighter in the center
    float d1 = sdSphere(uv, vec2(0.6), .5);
    float d2 = sdSphere(uv, vec2(u_step), 0.5);

    float color  = max(d1, d2);
    color = step(0.9, color);

    // Increase luminosity with distance to center
    gl_FragColor = vec4(vec3(color), 1.0); //RGBA
}