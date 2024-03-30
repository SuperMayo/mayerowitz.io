uniform vec2 resolution;

void main() {
	vec2 st = gl_FragCoord.xy/(resolution.xy*2.0); // normalize the coordinates
    gl_FragColor = vec4(st.x, st.y, 1.0);
}