uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

float sdSphere(vec3 p, float center )
{
  return length(p)-center;
}

void main() {
	vec2 st = gl_FragCoord.xy/resolution.xy;
	gl_FragColor=vec4(st.x,st.y,1.0,1.0);
}