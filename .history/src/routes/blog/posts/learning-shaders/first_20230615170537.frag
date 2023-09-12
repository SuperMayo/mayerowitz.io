uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

void main() {
	vec2 st = gl_FragCoord.xy/resolution.xy;
	float xmouse = mouse.x/1080;
	gl_FragColor=vec4(st.x,st.y,1.0,1.0);
}