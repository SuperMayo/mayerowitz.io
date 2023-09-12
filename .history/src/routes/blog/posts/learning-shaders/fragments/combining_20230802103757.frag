varying vec2 vUv;
uniform float u_slider;

float circleSDF(vec2 p, float r)
{
  return length(p) - r;
}

void main() {
    vec2 uv = vUv;

    // Two SDFs
    float d1 = circleSDF(vec2(0.7) - uv, 0.2);
    float d2 = circleSDF(vec2(0.4) - uv, 0.2);

    // Blend
    float d = step(0., min(d1, d2));


    gl_FragColor = vec4(vec3(d), 1.0);
}