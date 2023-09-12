uniform vec2 resolution;
uniform float u_step;

float sdSphere(vec2 uv, vec2 center, float size)
{
  return 1.0 - distance(uv, center) / size;
}

// Polynomial smooth min
float smin(float a, float b, float k)
{
    float h = max( k-abs(a-b), 0.0 )/k;
    return min( a, b ) - h*h*k*(1.0/4.0);
}

// smooth max
float smax(float a, float b, float k)
{
    return -smin(-a, -b, k);
}

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy) / resolution.xy;

    // distance of the current pixel from the center of the screen
    // 1-distance to get brighter in the center
    float d1 = sdSphere(uv, vec2(0.6), .5);
    float d2 = sdSphere(uv, vec2(u_step), 0.5);

    //float color = step(0.2, d1 + d2);
    float color  = smax(d1,d2,0.8);
    color = step(0.8, color);
    
   // float color = step(0.9, d1 + d2);

    // Increase luminosity with distance to center
    gl_FragColor = vec4(vec3(color), 1.0); //RGBA
}