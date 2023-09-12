varying vec2 vUv;
uniform float u_slider;

float circleSDF(vec2 p, float r)
{
  return length(p) - r;
}

// Polynomial smooth min
float smin(float a, float b, float k)
{
    float h = max( k-abs(a-b), 0.0 )/k;
    return min( a, b ) - h*h*k*(1.0/4.0);
}

void main() {
    vec2 uv = vUv;

    // The SDF for each disk
    float d1 = circleSDF(vec2(0.65) - uv, 0.2);
    float d2 = circleSDF(vec2(0.35) - uv, 0.2);

    // Union of disks
    float d = 1. - smoothstep(0., 0.01, smin(d1, d2, u_slider/2.+0.001));

    gl_FragColor = vec4(vec3(d), 1.0);
}