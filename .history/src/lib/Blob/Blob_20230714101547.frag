#ifdef GL_ES
precision highp float;
#endif

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
varying vec2 vUv;

#define REPEL 0.001
#define DISTLIM 0.1

float sdSphere(vec2 p, vec2 center, float size )
{
  return 1.0 - distance(p, center) / size;
}

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
    float scaleFactor = min(resolution.x, resolution.y);
	  vec2 st = (vUv - 0.5); // Center the coordinate system (for scaling)
    float aspectRatio = (resolution.x / resolution.y);
    st.x *= aspectRatio;
    
    // Handle Mouse
    vec2 m = (vec2( mouse.x/resolution.x, 1.0 - mouse.y/resolution.y) - 0.5);// normalize mouse coordinate
    m.x = ((m.x) * aspectRatio) - 0.01;

    // Shift back the coordinate system
    st += 0.5;
    m += 0.5;

    // Scale the coordinate system;

    // Define the center of each metaball
    // X fixed
    vec2 c1 = vec2(0.4, map(cos(time), -1., 1., 0.5, 0.6));
    c1 = 0.8*c1 + 0.2*m;
    vec2 c3 = vec2(0.5, map(sin(time), -1., 1., 0.4, 0.6));
    // Y fixed
    vec2 c2 = vec2(map(sin(time), -1., 1., 0.4, 0.7), 0.5);
    vec2 c4 = vec2(map(cos(time), -1., 1., 0.4, 0.63), 0.7);

    // Calculate the distance to each metaball
    float d1 = sdSphere(st, c1, 0.772);
    float d2 = sdSphere(st, c2, 0.996);
    float d3 = sdSphere(st, c3, 0.908);
    float d4 = sdSphere(st, c4, 1.028);
    float d5 = sdSphere(st, m, 0.3);

    // Calculate the metaball
    float k = 0.4; // Smoothing factor
    float metaalt =  smax(d1 ,d2, k);
    metaalt = smax(metaalt, d3, k);
    metaalt = smax(metaalt, d4, k);
    metaalt = smax(metaalt, d5, k/1.5);
    metaalt = step(0.9, metaalt);

    // Centroid of metaballs (for gradient)
    vec2 center = (c1 + c2 + c3 + c4)/4.;
    center.x *= 2.;
    center.y /= 2.;

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
    color.a = metaalt;
    float dist = distance(st, newCenter) / 2.;
    color.rgb = mix(vec3(255./255., 249./255., 240./255.),
                vec3(225./255., 230./255., 230./255.), dist);
    
    d5 = smoothstep(0.5, 0.8, d5);
    color.rgb = mix(color.rgb, vec3(242./255., 241./255., 235./255.), d5);
    color.rgb = vec3(255./255., 249./255., 240./255.) * (1. - metaalt) + color.rgb * metaalt;

    //gl_FragColor = vec4(vec3(distance(st, vec2(0.5))), 1.0);
    //gl_FragColor = vec4(vec3(color.a), 1.0);
    gl_FragColor = vec4(color.rgb, 1.0);
}