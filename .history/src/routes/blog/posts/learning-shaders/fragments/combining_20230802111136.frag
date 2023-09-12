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
    float c = 1. - step(0., min(d1, d2));
    float c1 = 1. - step(0., d1);
    float c2 = 1. - step(0., d2);

    float f = fract(sin(d*100.));


    gl_FragColor = vec4(c1, c2, 0.0, 1.0);
}