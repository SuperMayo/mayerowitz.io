uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

#define REPEL 0.001
#define DISTLIM 0.1
#define GRID_SIZE 100.

float sdSphere(vec2 p, vec2 center, float size )
{
  return 1.0 - distance(p, center) / size;
}

// 4x4 Bayer matrix for ordered dithering
const mat4 bayerMatrix = mat4(
    0.0/16.0, 8.0/16.0, 2.0/16.0, 10.0/16.0,
    12.0/16.0, 4.0/16.0, 14.0/16.0, 6.0/16.0,
    3.0/16.0, 11.0/16.0, 1.0/16.0, 9.0/16.0,
    15.0/16.0, 7.0/16.0, 13.0/16.0, 5.0/16.0);

// Polynomial smooth min
// Iñigo Quílez
float smin(float a, float b, float k)
{
    float h = max( k-abs(a-b), 0.0 )/k;
    return min( a, b ) - h*h*k*(1.0/4.0);
}

float smax(float a, float b, float k) {
    return -smin(-a, -b, k);
}

float map(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void main() {
	vec2 st = gl_FragCoord.xy/(resolution.xy*2.); // normalize the coordinates
    float aspectRatio = resolution.x / resolution.y;
    st.x = st.x * aspectRatio;
    //st = floor(st * GRID_SIZE * aspectRatio) / (GRID_SIZE * aspectRatio);
    
    // Handle Mouse
    vec2 m = mouse.xy/resolution.xy; // normalize mouse coordinates
    m.y = 1.0 - m.y; // invert y axis to match the canvas
    m.x = (m.x);

    // Define the center of each metaball
    vec2 c1 = vec2(0.4, map(cos(time), -1., 1., 0.3, 0.4));
    vec2 c2 = vec2(map(sin(time), -1., 1., 0.4, 0.7), 0.5);
    vec2 c3 = vec2(0.5, map(cos(time), -1., 1., 0.6, 0.7));
    vec2 c4 = vec2(map(cos(time), -1., 1., 0.4, 0.63), 0.3);

    // Calculate the distance to each metaball
    float d1 = sdSphere(st, c1, 0.772);
    float d2 = sdSphere(st, c2, 0.996);
    float d3 = sdSphere(st, c3, 0.908);
    float d4 = sdSphere(st, c4, 1.028);
    float d5 = sdSphere(st, m, 0.5);

    float k = 0.4;
    // Calculate the metaball
    float metaalt =  smax(d1 ,d2, k);
    metaalt = smax(metaalt, d3, k);
    metaalt = smax(metaalt, d4, k);
    metaalt = smax(metaalt, d5, k);
    metaalt = step(0.9, metaalt);

    // Centroid of metaballs (for gradient)
    vec2 center = (c1 + c2 + c3 + c4)/4.;
    center /= 2.;

    // Mouse repel center
    vec2 repelDir = normalize(center - m);
    float repelDist = distance(m, center);
    vec2 newCenter = center + REPEL * repelDir /  (repelDist * repelDist);

    // Limit the newCenter distance
    vec2 disp = newCenter - center;
    float dispDist = length(disp);
    vec2 dispDir = disp / dispDist;
    dispDist = clamp(dispDist, 0.01, DISTLIM);
    newCenter = center + dispDir * dispDist;
    
    // Final color
    vec4 color = vec4(0.);
    color.a = 1. - metaalt;
    
    //gl_FragColor = vec4(vec3(st), 1.0);
    //gl_FragColor = vec4(vec3(color.a), 1.0);
    gl_FragColor = vec4(230./255.*gradient, 230./255., 230./255., color.a/1.);
}