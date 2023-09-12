varying vec2 vUv;
uniform float u_slider;

float circleSDF(vec2 p, float r)
{
  return length(p) - r;
}

void main() {
    vec2 uv = vUv;

    // distance of the current pixel from the center of the screen
    // 1-distance to get brighter in the center
    float d1 = sdSphere(uv, vec2(0.5), 1.0);
    float d2 = sdSphere(uv, vec2(u_slider), 1.0);

    // Set pixel color
    vec3 color = vec3(0.0, 0.0, 0.0);
    color.x = step(0.9,d1); // Red if close to d1
    color.y = step(0.9,d2); // Green if close to d2

    // Increase luminosity with distance to center
    gl_FragColor = vec4(color, 1.0); //RGBA
}