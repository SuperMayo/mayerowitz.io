varying vec2 vUv;
uniform float u_slider;

float sdSphere(vec2 uv, vec2 center, float size)
{
  return 1.0 - distance(uv, center) / size;
}

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = vUv;

    // distance of the current pixel from the center of the screen
    // 1-distance to get brighter in the center
    float d1 = sdSphere(uv, vec2(0.6), 1.0);
    float d2 = sdSphere(uv, vec2(u_slider), 1.0);

    float o  = step(0.9,d1) + step(0.9,d2);

    // Increase luminosity with distance to center
    gl_FragColor = vec4(vec3(o), 1.0); //RGBA
}