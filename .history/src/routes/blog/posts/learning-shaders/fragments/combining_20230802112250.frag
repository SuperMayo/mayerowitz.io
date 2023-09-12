varying vec2 vUv;
uniform float u_slider;

float circleSDF(vec2 p, float r)
{
  return length(p) - r;
}

void main() {
    vec2 uv = vUv;

    // The SDFS for each circle
    float d1 = circleSDF(vec2(0.6) - uv, 0.2);
    float d2 = circleSDF(vec2(0.4) - uv, 0.2);

    // Merging is as simple as taking the min
    // Q: What happens if you use max instead?
    float d = min(d1, d2);

    // Output each circle to a different color channel
    vec3 color = vec3(0.0);
    color.r = 1. - smoothstep(0., 0.01, d1); // red
    color.g = 1. - smoothstep(0., 0.01, d2); // green

    // Merged circle in yellow
    vec3 dc = (1. - smoothstep(0.,0.01, d)) * vec3(1.0, 1.0, 0.);

    // Mix given u_slider
    // mix(x, y, a) = x * (1.0 - a) + y * a
    color = mix(color, vec3(dc), u_slider);

    gl_FragColor = vec4(color, 1.0);
}