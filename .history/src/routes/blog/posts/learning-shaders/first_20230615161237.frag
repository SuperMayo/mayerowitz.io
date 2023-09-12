uniform vec2 resolution;
uniform float time;

void main() {
	vec2 st = gl_FragCoord.xy/resolution.xy;
	gl_FragColor=vec4(st.x,st.y,0.0,1.0);
}