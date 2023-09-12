uniform vec2 u_resolution;
uniform float u_time;
uniform float u_slider;
uniform vec2 u_mouse;
varying vec2 vUv;

// C-style macro to define constants
#define K 0.4

float circleSDF(vec2 uv, vec2 p, float r)
{
  return length(p-uv) - r;
}

float smin(float a, float b, float k)
{
  float h = max( k-abs(a-b), 0.0 )/k;
  return min( a, b ) - h*h*k*(1.0/4.0);
}

// Map a value from -1 to 1 to out_min to out_max
float trigmap(float x, float out_min, float out_max)
{
  return out_min + (x + 1.) * (out_max - out_min) / (2.);
}

void main() {
  vec2 uv = vUv;

  // Handle Mouse
  vec2 m = u_mouse.xy/u_resolution.xy; // normalize mouse coordinates
  m.y = 1.0 - m.y; // invert y axis to match the canvas
  m.x = (m.x);

  // Define the center of each metaball
  vec2 c1 = vec2(0.4,trigmap(cos(u_time), 0.3, 0.4));
  vec2 c2 = vec2(trigmap(sin(u_time), 0.4, 0.7), 0.5);
  vec2 c3 = vec2(0.5, trigmap(cos(u_time), 0.6, 0.7));
  vec2 c4 = vec2(trigmap(cos(u_time), 0.4, 0.63), 0.3);
  vec2 c_mouse = vec2(m.x, m.y);
  
  // Store the centers in an array
  vec2 centers[4] = vec2[4](c1,c2,c3,c4);

  // Initialize the distance and define the smoothing factor
  float d = 99.;

  // Iterate over the centers and compute the sdf
  for (int i = 0; i < 4; i++) {
    vec2 c = centers[i];
    float sdf = circleSDF(uv, c, .1*u_slider);
    d = smin(d, sdf, K);
  }
  // Define the metaball
  float metaball = 1. - smoothstep(0., 0.005, d);

  // DEBUG
  float sdf_mouse = circleSDF(uv, c_mouse, 0.1);
  float mouse_ball = 1. - step(0., sdf_mouse);
  
  gl_FragColor = vec4(m.x/3000., 0.0, 0.0, 1.0);
}