import { c as create_ssr_component, v as validate_component } from "../../chunks/index3.js";
import { Vector2, Clock } from "three";
import { C as Canvas, T } from "../../chunks/T.js";
const Blob = "#ifdef GL_ES\nprecision highp float;\n#endif\n\nuniform vec2 resolution;\nuniform float time;\nuniform vec2 mouse;\nvarying vec2 vUv;\n\n#define REPEL 0.001\n#define DISTLIM 0.1\n\nfloat sdSphere(vec2 p, vec2 center, float size )\n{\n  return 1.0 - distance(p, center) / size;\n}\n\n// Polynomial smooth min\n// Iñigo Quílez\nfloat smin(float a, float b, float k)\n{\n    float h = max( k-abs(a-b), 0.0 )/k;\n    return min( a, b ) - h*h*k*(1.0/4.0);\n}\n\nfloat smax(float a, float b, float k) {\n    return -smin(-a, -b, k);\n}\n\nfloat map(float x, float in_min, float in_max, float out_min, float out_max)\n{\n  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n}\n\nvoid main() {\n    float scaleFactor = min(resolution.x, resolution.y);\n	  vec2 st = (vUv - 0.5); // Center the coordinate system (for scaling)\n    float aspectRatio = (resolution.x / resolution.y);\n    st.x *= aspectRatio;\n    \n    // Handle Mouse\n    vec2 m = (vec2( mouse.x/resolution.x, 1.0 - mouse.y/resolution.y) - 0.5);// normalize mouse coordinate\n    m.x = ((m.x) * aspectRatio) - 0.01;\n\n    // Shift back the coordinate system\n    st += 0.5;\n    m += 0.5;\n\n    // Define the center of each metaball\n    // X fixed\n    vec2 c1 = vec2(0.4, map(cos(time), -1., 1., 0.5, 0.6));\n    vec2 c3 = vec2(0.5, map(sin(time), -1., 1., 0.4, 0.6));\n    // Y fixed\n    vec2 c2 = vec2(map(sin(time), -1., 1., 0.4, 0.7), 0.5);\n    vec2 c4 = vec2(map(cos(time), -1., 1., 0.4, 0.63), 0.7);\n\n    // Calculate the distance to each metaball\n    float d1 = sdSphere(st, c1, 0.772);\n    float d2 = sdSphere(st, c2, 0.996);\n    float d3 = sdSphere(st, c3, 0.908);\n    float d4 = sdSphere(st, c4, 1.028);\n    float d5 = sdSphere(st, m, 0.3);\n\n    // Calculate the metaball\n    float k = 0.4; // Smoothing factor\n    float metaalt =  smax(d1 ,d2, k);\n    metaalt = smax(metaalt, d3, k);\n    metaalt = smax(metaalt, d4, k);\n    metaalt = smax(metaalt, d5, k/1.5);\n    metaalt = step(0.9, metaalt);\n\n    // Centroid of metaballs (for gradient)\n    vec2 center = (c1 + c2 + c3 + c4)/4.;\n    center.x *= 2.;\n    center.y /= 2.;\n\n    // Mouse repel center\n    vec2 repelDir = normalize(center - m);\n    float repelDist = distance(m, center);\n    vec2 newCenter = center + REPEL * repelDir /  (repelDist * repelDist);\n\n    // Limit the newCenter distance\n    vec2 disp = newCenter - center;\n    float dispDist = length(disp);\n    vec2 dispDir = disp / dispDist;\n    dispDist = clamp(dispDist, 0.01, DISTLIM);\n    newCenter = center + dispDir * dispDist;\n    \n    // Final color\n    vec4 color = vec4(0.);\n    color.a = metaalt;\n    float dist = distance(st, newCenter) / 2.;\n    color.rgb = mix(vec3(255./255., 249./255., 240./255.),\n                vec3(225./255., 230./255., 230./255.), dist);\n    \n    d5 = smoothstep(0.5, 0.8, d5);\n    color.rgb = mix(color.rgb, vec3(242./255., 241./255., 235./255.), d5);\n    color.rgb = vec3(255./255., 249./255., 240./255.) * (1. - metaalt) + color.rgb * metaalt;\n\n    //gl_FragColor = vec4(vec3(distance(st, vec2(0.5))), 1.0);\n    //gl_FragColor = vec4(vec3(d1), 1.0);\n    gl_FragColor = vec4(color.rgb, 1.0);\n}";
const Blob_svelte_svelte_type_style_lang = "";
const css = {
  code: "#blob.svelte-1d24sqb{position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1}",
  map: null
};
const Blob_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const uniforms = {
    time: { value: 1 },
    resolution: { value: new Vector2() },
    mouse: { value: new Vector2() },
    u_step: { value: 0 }
  };
  const vertexShader = `
     varying vec2 vUv;
     void main() {
            vUv = uv;
            gl_Position = vec4(position, 1. );
        }
    `;
  new Clock();
  $$result.css.add(css);
  return `

<div id="blob" class="svelte-1d24sqb">${validate_component(Canvas, "Canvas").$$render(
    $$result,
    {
      size: {
        height: uniforms.resolution.value.y,
        width: uniforms.resolution.value.x
      }
    },
    {},
    {
      default: () => {
        return `${validate_component(T.Mesh, "T.Mesh").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(T.PlaneGeometry, "T.PlaneGeometry").$$render($$result, { args: [2, 2, 1, 1] }, {}, {})}
            ${validate_component(T.ShaderMaterial, "T.ShaderMaterial").$$render(
              $$result,
              {
                uniforms,
                vertexShader,
                fragmentShader: Blob
              },
              {},
              {}
            )}`;
          }
        })}`;
      }
    }
  )}
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="mx-auto text-justify max-w-xl font-mono md:mt-five mt-one">${validate_component(Blob_1, "Blob").$$render($$result, {}, {}, {})}
    <div class="px-5"><p>Hi, I’m Antoine Mayerowitz.</p>
    <p>I&#39;m a French data scientist and artist, currently living in Paris. I hold
      a PhD in economics. My current focus is on data science,
      generative design, and interactive web stories.
    </p>
    <p>You can also find me here:
      <br>
      <a>Twitter</a> / <a>Threads</a> / <a>Instagram</a> / <a>Twitch</a> / <a>Github</a></p>
    <p>Want to discuss? Send me an email at antoine@mayerowitz.io
    </p></div></main>`;
});
export {
  Page as default
};
