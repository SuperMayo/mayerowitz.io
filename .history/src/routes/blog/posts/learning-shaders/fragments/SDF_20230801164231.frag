varying vec2 vUv;
uniform float u_slider;

float circleSDF(vec2 p, float r)
{
  return length(p) - r;
}

void main() {
    vec2 uv = vUv;

    // Signed distance to a circle centered at (0.5, 0.5)
    float d = circleSDF(vec2(0.5) - uv, u_slider);

    // Default color to black
    vec3 color = vec3(0.0, 0.0, 0.0);
    if (d < 0.0) {
        color = vec3(0.0588, 0.6118, 0.4549);
    } else {
        color = vec3(0.8353, 0.7412, 0.1098);
    }

    // Increase luminosity with distance to center
    gl_FragColor = vec4(color, 1.0); //RGBA
}