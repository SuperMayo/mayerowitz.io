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

    // UNBLENDED CIRCLES
    // Output each circle to a different color channel
    vec3 color = vec3(0.0);
    color.r = 1. - smoothstep(0., 0.01, d1); // red
    color.g = 1. - smoothstep(0., 0.01, d2); // green

    // UNION OF CIRCLES
    // Merging is as simple as taking the min()
    float d = min(d1, d2);
    // Set `dc` . to yellow if within the union of the two circles
    vec3 dc = (1. - smoothstep(0.,0.01, d)) * vec3(1.0, 1.0, 0.);

    // Mix color and dc according to slider value
    // mix(x, y, a) = x * (1.0 - a) + y * a
    color = mix(color, dc, u_slider);

    gl_FragColor = vec4(color, 1.0);
}