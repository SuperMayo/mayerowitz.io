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

    // Merging is as simple as taking the min 
    float d = min(d1, d2);

    // Output each circle to a different color channel
    vec3 color = vec3(0.0);
    color.r = 1. - smoothstep(0., 0.01, d1);
    color.g = 1. - smoothstep(0., 0.01, d2);

    // 
    float dc = 1. - smoothstep(0.,0.01, d);

    // Mix given u_slider
    // mix(x, y, a) = x * (1.0 - a) + y * a
    color = mix(color, vec3(dc), u_slider);

    gl_FragColor = vec4(color, 1.0);
}