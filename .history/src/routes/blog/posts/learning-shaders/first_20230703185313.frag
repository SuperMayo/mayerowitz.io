uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

float sdSphere(vec2 p, vec2 center, float size )
{
  return 1.0 - smoothstep(size, size*1.01, distance(p, center));
}

void main() {
	vec2 st = gl_FragCoord.xy/(resolution.xy*2.0); // normalize the coordinates
    float dist = sdSphere(st, vec2(0.5), 0.3); // distance of each points to the center
    vec3 color = vec3(dist); // Generate RGB values for each point on plane
	gl_FragColor=vec4(color, 1.0);
}