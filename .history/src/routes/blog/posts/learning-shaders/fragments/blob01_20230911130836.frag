uniform float u_time;
varying vec2 vUv;
uniform float u_slider;

float circleSDF(vec2 uv, vec2 p, float r)
{
  return length(p-uv) - r;
}

// Polynomial smooth min
// Iñigo Quílez
float smin(float a, float b, float k)
{
    float h = max( k-abs(a-b), 0.0 )/k;
    return min( a, b ) - h*h*k*(1.0/4.0);
}

float trigmap(float x, float out_min, float out_max)
{
  return out_min + (x + 1.) * (out_max - out_min) / (2.)
}

void main() {
	  vec2 uv = vUv;

    // Define the center of each metaball
    vec2 c1 = vec2(0.4,trigmap(cos(u_time), 0.3, 0.4));
    vec2 c2 = vec2(trigmap(sin(u_time), 0.4, 0.7), 0.5);
    vec2 c3 = vec2(0.5, trigmap(cos(u_time), 0.6, 0.7));
    vec2 c4 = vec2(trigmap(cos(u_time), 0.4, 0.63), 0.3);

    // Calculate the distance to each metaball
    float d1 = circleSDF(uv, c1, .1*u_slider);
    float d2 = circleSDF(uv, c2, .1*u_slider);
    float d3 = circleSDF(uv, c3, .1*u_slider);
    float d4 = circleSDF(uv, c4, .1*u_slider);

    float k = 0.4;
    // Calculate the metaball
    float metaalt =  smin(d1 ,d2, k);
    metaalt = smin(metaalt, d3, k);
    metaalt = smin(metaalt, d4, k);
    metaalt = 1. -  smoothstep(0., 0.005, metaalt);
    
    
    //gl_FragColor = vec4(vec3(step(0.,d1)), 1.0);
    //gl_FragColor = vec4(vec3(metaball), 1.0);
    gl_FragColor = vec4(vec3(metaalt), 1.0);
}