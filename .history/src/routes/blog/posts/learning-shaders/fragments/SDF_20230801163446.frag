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
    float d1 = circleSDF(vec2(0.5) - uv, u_slider);

    // Set pixel color
    vec3 color = vec3(0.0, 0.0, 0.0);
    color.r = smoothstep(0.01, 0., d1); // Red if close to d1
    color.g = smoothstep(0., 0.01, d1); // Green if close to d1


    // Increase luminosity with distance to center
    gl_FragColor = vec4(color, 1.0); //RGBA
}