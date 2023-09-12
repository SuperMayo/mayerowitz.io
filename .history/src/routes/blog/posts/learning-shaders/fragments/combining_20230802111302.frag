varying vec2 vUv;
uniform float u_slider;

float circleSDF(vec2 p, float r)
{
  return length(p) - r;
}

void main() {
    vec2 uv = vUv;

    // Two SDFs
    float d1 = circleSDF(vec2(0.6) - uv, 0.2);
    float d2 = circleSDF(vec2(0.4) - uv, 0.2);

    float d = min(d1, d2);

    // Blend
    vec3 color = vec3(0.0);
    color.r = 1. - step(0., d1);
    color.g = 1. - step(0., d2);

    float f = fract(sin(d*100.));


    gl_FragColor = vec4(c1, c2, 0.0, 1.0);
}