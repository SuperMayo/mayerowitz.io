uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

float sdSphere(vec2 p, vec2 center, float size )
{
  return 1.0 - smoothstep(size, size+0.3, distance(p, center));
}

float map(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void main() {
	vec2 st = gl_FragCoord.xy/(resolution.xy*2.0); // normalize the coordinates
    float d1 = sdSphere(st, vec2(map(cos(time), -1., 1., 0.3, 0.4), 0.5), 0.01); // distance of each points to the center
    float d2 = sdSphere(st, vec2(map(sin(time), -1., 1., 0.6, 0.7), 0.5), 0.004); // distance of each points to the center
    float d3 = sdSphere(st, vec2(0.5, map(sin(time), -1., 1., 0.6, 0.7)), 0.01); // distance of each points to the center
    float metaball = smoothstep(0.6, 0.61, d1 + d2 + d3);
    vec3 color = vec3(metaball); // Generate RGB values for each point on plane
	gl_FragColor=vec4(color, 1.0);
}