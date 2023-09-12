uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

// 4x4 Bayer matrix for ordered dithering
const mat4 bayerMatrix = mat4(
    0.0/16.0, 8.0/16.0, 2.0/16.0, 10.0/16.0,
    12.0/16.0, 4.0/16.0, 14.0/16.0, 6.0/16.0,
    3.0/16.0, 11.0/16.0, 1.0/16.0, 9.0/16.0,
    15.0/16.0, 7.0/16.0, 13.0/16.0, 5.0/16.0);

float sdSphere(vec2 p, vec2 center, float size )
{
  return 1.0 - smoothstep(size, size+0.3, distance(p, center));
}

float map(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void main() {
	vec2 st = gl_FragCoord.xy/(resolution.xy*1.); // normalize the coordinates
    
    float d1 = sdSphere(st, vec2(0.4, map(cos(time), -1., 1., 0.3, 0.4)), 0.05); // distance of each points to the center
    float d2 = sdSphere(st, vec2(map(sin(time), -1., 1., 0.4, 0.7), 0.5), 0.02); 
    float d3 = sdSphere(st, vec2(0.5, map(sin(time), -1., 1., 0.6, 0.7)), 0.01); 
    float d4 = sdSphere(st, vec2(map(cos(time), -1., 1., 0.4, 0.63), 0.3), 0.1);
    float metaball = smoothstep(0.9, 0.91, d2+d3+d1+d4);
    vec2 centroidx = (vec2(0.4, map(cos(time), -1., 1., 0.3, 0.4)) +
        vec2(map(sin(time), -1., 1., 0.4, 0.7), 0.5) +
        vec2(0.5, map(sin(time), -1., 1., 0.6, 0.7)) +
        vec2(map(cos(time), -1., 1., 0.4, 0.63), 0.3))/4.0;

    // mouse handling
    vec2 m = mouse.xy/resolution.xy; // normalize mouse coordinates
    m.y = 1.0 - m.y; // invert y axis to match the canvas
    vec2 ab = centroidx - m; // vector going from mouse to centroid
    float distab = distance(m, centroidx); // distance between the two points

    // Apply dithering
    float scale = 2.0;
    float dither = bayerMatrix[int(gl_FragCoord.x/scale) % 4][int(gl_FragCoord.y/scale) % 4];
    float metadither = step(dither, distance(st, m));
    metaball = min(metadither, metaball);
    
    

    //gl_FragColor = vec4(centroid, 1.0, 1.0);
    gl_FragColor = vec4(0.0, 0.5*metaball, .5*metaball, metaball);
}