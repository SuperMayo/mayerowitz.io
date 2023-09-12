uniform float u_time;
varying vec2 vUv;
uniform float u_slider;

float sdSphere(vec2 p, vec2 center, float size )
{
  return 1.0 - distance(p, center) / size;
}

float circleSDF(vec2 uv, vec2 p, float r)
{
  return 1. - length(p-uv) - r;
}

// Polynomial smooth min
// Iñigo Quílez
float smin(float a, float b, float k)
{
    float h = max( k-abs(a-b), 0.0 )/k;
    return min( a, b ) - h*h*k*(1.0/4.0);
}

float map(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void main() {
	  vec2 st = vUv;

    // Define the center of each metaball
    vec2 c1 = vec2(0.4, map(cos(u_time), -1., 1., 0.3, 0.4));
    vec2 c2 = vec2(map(sin(u_time), -1., 1., 0.4, 0.7), 0.5);
    vec2 c3 = vec2(0.5, map(cos(u_time), -1., 1., 0.6, 0.7));
    vec2 c4 = vec2(map(cos(u_time), -1., 1., 0.4, 0.63), 0.3);

    // Calculate the distance to each metaball
    float d1 = circleSDF(st, c1, 0.072);
    float d2 = circleSDF(st, c2, 0.006);
    float d3 = circleSDF(st, c3, 0.008);
    float d4 = circleSDF(st, c4, 0.028);

    float k = 0.4;
    // Calculate the metaball
    float metaalt =  smin(d1 ,d2, k);
    metaalt = smin(metaalt, d3, k);
    metaalt = smin(metaalt, d4, k);
    metaalt = step(0., metaalt);
    
    
    //gl_FragColor = vec4(vec3(step(0.,d1)), 1.0);
    //gl_FragColor = vec4(vec3(metaball), 1.0);
    gl_FragColor = vec4(vec3(metaalt), 1.0);
}