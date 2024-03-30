uniform float u_time;
uniform float u_slider;
uniform vec2 u_mouse;
varying vec2 vUv;

// C-style macro to define constants
#define K 0.4
#define REPEL 0.001
#define DISTLIM 0.1

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
  vec2 m = u_mouse.xy; // normalize mouse coordinates
  m.y = 1.0 - m.y; // invert y axis to match the canvas
  m.x = (m.x);

  // Define the center of each metaball
  vec2 c1 = vec2(0.35,trigmap(cos(u_time), 0.3, 0.7));
  vec2 c2 = vec2(trigmap(cos(u_time), 0.3, 0.7), 0.7);
  vec2 c3 = vec2(0.7, trigmap(sin(u_time), 0.3, 0.7));
  vec2 c4 = vec2(trigmap(cos(u_time), 0.3, 0.7), 0.3);
  
  // Store the centers in an array
  vec2 centers[5] = vec2[5](c1,c2,c3,c4,m);

  // Color is function of the centroid
  vec2 ctroid = (c1 + c2 + c3 + c4) / 4.;
  ctroid *= vec2(1.3, 0.7);
  vec4 color = vec4(1.);

  // Initialize the distance and define the smoothing factor
  float d = 99.;

  // Iterate over the centers and compute the sdf
  for (int i = 0; i < 5; i++) {
    vec2 c = centers[i];
    float sdf = circleSDF(uv, c, .15);
    d = smin(d, sdf, K);
  }
  // Define the metaball
  float metaball = 1. - smoothstep(0., 0.003, d);

  // Final color
  float fx = ((clamp(m.x, 0., 1.)/20.) + 1. );
  float fy = ((clamp(m.y, 0., 1.)/10.) + 1. );
  float shine = exp(-abs(d));
  float membrane = 1. - smoothstep(0.001, 0.005, clamp(abs(d), 0., 1.));
  float dist = distance(uv, ctroid);

  color.rgb = mix(vec3(255./255. * fy, 249./255., 240./255. * fx),
                vec3(225./255., 230./255., 230./255.), dist);
  color.rgb = mix(vec3(0.35, 0., 0.), color.rgb, shine);
  // color the membrane
  color.rgb = mix(color.rgb, vec3(0.5, 0.3, 0.3), membrane);
  vec4 bg = vec4(255./255., 249./255., 240./255., 1.) * (1. - distance(uv, vec2(0.5)));
  color = mix(bg*metaball, color, metaball);
  
  gl_FragColor = color;
}