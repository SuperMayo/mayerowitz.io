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

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float map(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void main() {
	  vec2 st = gl_FragCoord.xy/(resolution.xy*1.); // normalize the coordinates
    float r = 0.5;
    float aspectRatio = resolution.x / resolution.y;
    vec2 m = mouse.xy/resolution.xy; // normalize mouse coordinates
    m.y = 1.0 - m.y; // invert y axis to match the canvas
    m.x = (m.x - 0.5) * aspectRatio + 0.5;
    st.x = (st.x - 0.5) * aspectRatio + 0.5;

    // Define the center of each metaball
    vec2 c1 = vec2(0.4, map(cos(time), -1., 1., 0.3, 0.4));
    vec2 c2 = vec2(map(sin(time), -1., 1., 0.4, 0.7), 0.5);
    vec2 c3 = vec2(0.5, map(sin(time), -1., 1., 0.6, 0.7));
    vec2 c4 = vec2(map(cos(time), -1., 1., 0.4, 0.63), 0.3);

    // Calculate the distance to each metaball
    float d0 = sdBox(st+vec2(-0.5,-0.6), vec2(0.2, 0.01));
    d0 = smoothstep(0.35, 0.235, d0);
    float d1 = sdSphere(st, c1, 0.05);
    float d2 = sdSphere(st, c2, 0.02);
    float d3 = sdSphere(st, c3, 0.01);
    float d4 = sdSphere(st, c4, 0.1);
    float d5 = sdSphere(st, m, 0.01);

    // Calculate the metaball
    float metaball = smoothstep(0.9, 0.91, d2+d3+d1+d4+d5);

    // Calculate the centroid
    vec2 cntd = (c1 + c2 + c3 + c4) / 4.;
    cntd /= 2.; // Shift it to the lower left corner

    // Calculate repulsion of the centroid from the mouse
    float repel_strength = 0.001;
    vec2 repelDir = normalize(cntd - m);
    float repelDist = distance(m, cntd);
    vec2 newCentroid = cntd + repel_strength * repelDir / (repelDist * repelDist);

    // Limit the new centroid's distance from the original centroid
    vec2 displacement = newCentroid - cntd;
    float displacementDist = length(displacement);
    vec2 displacementDir = displacement / displacementDist;
    
    // Set your limit distance here
    float limit_distance = .1;
    
    // Clamp the distance
    displacementDist = clamp(displacementDist, 0.01, limit_distance);
    newCentroid = cntd + displacementDir * displacementDist;

    // Apply dithering
    float scale = 1.;
    float dither = bayerMatrix[int(gl_FragCoord.x) % 4][int(gl_FragCoord.y) % 4];
    float metadither = step(dither, distance(newCentroid, st));
    metaball = min(metadither, metaball);
    
    
    //gl_FragColor = vec4(, 1.0);
    //gl_FragColor = vec4(vec3(metaball), 1.0);
    gl_FragColor = vec4(0.0, .5, .5, metaball);
}