uniform vec2 resolution;
varying vec2 vUv;

float sdSphere(vec2 uv, vec2 center, float size)
{
  return 1.0 -  distance(uv, center) / size;
}

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy) / resolution.xy;

    // distance of the current pixel from the center of the screen
    // 1-distance to get brighter in the center
    float d1 = sdSphere(uv, vec2(0.1), 1.0);
    float d2 = sdSphere(uv, vec2(0.8), 0.8);

    float o = d1 + d2;
    o = smoothstep(0.89, 0.9, o);

    // Increase luminosity with distance to center
    gl_FragColor = vec4(vec3(o), 1.0); //RGBA
}