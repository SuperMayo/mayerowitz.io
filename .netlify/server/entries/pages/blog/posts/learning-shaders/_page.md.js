import { c as create_ssr_component, e as escape, f as createEventDispatcher, o as onDestroy, a as add_attribute, v as validate_component } from "../../../../../chunks/index3.js";
import { Vector2, Clock } from "three";
import { C as Canvas } from "../../../../../chunks/T.js";
import { basicSetup } from "codemirror";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { I as ImageWrapper } from "../../../../../chunks/ImageWrapper.js";
import "roughjs";
const PostLayout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { date } = $$props;
  let { readingTime } = $$props;
  let { subtitle } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.readingTime === void 0 && $$bindings.readingTime && readingTime !== void 0)
    $$bindings.readingTime(readingTime);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  return `<div class="max-w-2xl m-auto w-11/12"><h1 class="text-4xl lg:-mx-three font-bold">${escape(title)}</h1>
    <h2 class="text-xl mt-half font-bold text-right italic text-gray-500">${escape(subtitle)}</h2>
    <div class="text-gray-500 mt-one"><p class="font-mono text-base">|&gt; ${escape(date)}</p>
        <p class="font-mono text-base mb-two mt-0">|&gt; Reading time: ${escape(readingTime)}mn</p></div>
    <div class="markdown">${slots.default ? slots.default({}) : ``}</div></div>`;
});
const css_blob_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "@keyframes svelte-1bwdz2a-shape{from{border-radius:29% 71% 45% 55% / 70% 25% 75% 25%}to{border-radius:79% 21% 39% 61% / 30% 68% 32% 70%}}.container.svelte-1bwdz2a{box-shadow:inset 1em 1em 15px rgba(0, 128, 128, 0.03);background:linear-gradient(\n        45deg,\n        rgba(17, 128, 127, 0.05) 0%,\n        rgba(17, 128, 127, 0.003) 100%\n    );animation:5s svelte-1bwdz2a-shape ease-in-out;animation-iteration-count:infinite;animation-direction:alternate;width:50%;aspect-ratio:1.96;margin:0 auto}",
  map: null
};
const Css_blob = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="container svelte-1bwdz2a"></div>`;
});
const CodeMirror_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".codemirror-wrapper.svelte-kcx0g9 .cm-focused{outline:none}.scm-waiting.svelte-kcx0g9{position:relative}.scm-waiting__loading.svelte-kcx0g9{position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(255, 255, 255, 0.5)}.scm-loading.svelte-kcx0g9{display:flex;align-items:center;justify-content:center}.scm-loading__spinner.svelte-kcx0g9{width:1rem;height:1rem;border-radius:100%;border:solid 2px #000;border-top-color:transparent;margin-right:0.75rem;animation:svelte-kcx0g9-spin 1s linear infinite}.scm-loading__text.svelte-kcx0g9{font-family:sans-serif}.scm-pre.svelte-kcx0g9{font-size:0.85rem;font-family:monospace;tab-size:2;-moz-tab-size:2;resize:none;pointer-events:none;user-select:none;overflow:auto}@keyframes svelte-kcx0g9-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: null
};
const CodeMirror = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: classes = "" } = $$props;
  let { value = "" } = $$props;
  let { basic = true } = $$props;
  let { lang = void 0 } = $$props;
  let { theme = void 0 } = $$props;
  let { extensions = [] } = $$props;
  let { useTab = true } = $$props;
  let { tabSize = 2 } = $$props;
  let { styles = void 0 } = $$props;
  let { lineWrapping = false } = $$props;
  let { editable = true } = $$props;
  let { readonly = false } = $$props;
  let { placeholder: placeholder$1 = void 0 } = $$props;
  const is_browser = typeof window !== "undefined";
  createEventDispatcher();
  let element;
  let view;
  onDestroy(() => view?.destroy());
  function get_base_extensions(basic2, useTab2, tabSize2, lineWrapping2, placeholder$12, editable2, readonly2, lang2) {
    const extensions2 = [
      indentUnit.of(" ".repeat(tabSize2)),
      EditorView.editable.of(editable2),
      EditorState.readOnly.of(readonly2)
    ];
    if (basic2)
      extensions2.push(basicSetup);
    if (useTab2)
      extensions2.push(keymap.of([indentWithTab]));
    if (placeholder$12)
      extensions2.push(placeholder(placeholder$12));
    if (lang2)
      extensions2.push(lang2);
    if (lineWrapping2)
      extensions2.push(EditorView.lineWrapping);
    return extensions2;
  }
  function get_theme(theme2, styles2) {
    const extensions2 = [];
    if (styles2)
      extensions2.push(EditorView.theme(styles2));
    if (theme2)
      extensions2.push(theme2);
    return extensions2;
  }
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.basic === void 0 && $$bindings.basic && basic !== void 0)
    $$bindings.basic(basic);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0)
    $$bindings.lang(lang);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.extensions === void 0 && $$bindings.extensions && extensions !== void 0)
    $$bindings.extensions(extensions);
  if ($$props.useTab === void 0 && $$bindings.useTab && useTab !== void 0)
    $$bindings.useTab(useTab);
  if ($$props.tabSize === void 0 && $$bindings.tabSize && tabSize !== void 0)
    $$bindings.tabSize(tabSize);
  if ($$props.styles === void 0 && $$bindings.styles && styles !== void 0)
    $$bindings.styles(styles);
  if ($$props.lineWrapping === void 0 && $$bindings.lineWrapping && lineWrapping !== void 0)
    $$bindings.lineWrapping(lineWrapping);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
    $$bindings.editable(editable);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder$1 !== void 0)
    $$bindings.placeholder(placeholder$1);
  $$result.css.add(css$1);
  [
    ...get_base_extensions(basic, useTab, tabSize, lineWrapping, placeholder$1, editable, readonly, lang),
    ...get_theme(theme, styles),
    ...extensions
  ];
  return `${is_browser ? `<div class="${"codemirror-wrapper " + escape(classes, true) + " svelte-kcx0g9"}"${add_attribute("this", element, 0)}></div>` : `<div class="${"scm-waiting " + escape(classes, true) + " svelte-kcx0g9"}"><div class="scm-waiting__loading scm-loading svelte-kcx0g9"><div class="scm-loading__spinner svelte-kcx0g9"></div>
            <p class="scm-loading__text svelte-kcx0g9">Loading editor...</p></div>

        <pre class="scm-pre cm-editor svelte-kcx0g9">${escape(value)}</pre></div>`}`;
});
const uniforms = {
  time: { value: 1 },
  resolution: { value: new Vector2() },
  mouse: { value: new Vector2() },
  u_step: { value: 0 },
  slider: { value: 0 }
};
const Slider_svelte_svelte_type_style_lang = "";
const css = {
  code: 'input[type="range"].svelte-1k7wx0c{width:91.666667%;cursor:pointer;--tw-pan-y:pan-y;touch-action:var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom);-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent\n}input[type="range"].svelte-1k7wx0c:focus{outline:2px solid transparent;outline-offset:2px\n}input[type="range"].svelte-1k7wx0c::-webkit-slider-runnable-track{height:0.5rem;border-radius:0.125rem;--tw-bg-opacity:1;background-color:rgb(209 213 219 / var(--tw-bg-opacity))\n}input[type="range"].svelte-1k7wx0c::-webkit-slider-thumb{margin-top:-0.5rem;height:1.5rem;width:1.5rem;-webkit-appearance:none;appearance:none;border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(15 118 110 / var(--tw-bg-opacity))\n}input[type="range"].svelte-1k7wx0c:focus::-webkit-slider-thumb{outline-style:dashed;outline-offset:2px;outline-color:#0f766e\n}input[type="range"].svelte-1k7wx0c::-moz-range-track{height:0.5rem;border-radius:0.125rem;--tw-bg-opacity:1;background-color:rgb(209 213 219 / var(--tw-bg-opacity))\n}input[type="range"].svelte-1k7wx0c::-moz-range-thumb{height:1.5rem;width:1.5rem;border-radius:9999px;border-style:none;--tw-bg-opacity:1;background-color:rgb(15 118 110 / var(--tw-bg-opacity))\n}input[type="range"].svelte-1k7wx0c:focus::-moz-range-thumb{outline-style:dashed;outline-offset:2px;outline-color:#0f766e\n}',
  map: null
};
const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { min = 0 } = $$props;
  let { max = 100 } = $$props;
  let { step = 1 } = $$props;
  let { value = 0 } = $$props;
  let { id = "slider" } = $$props;
  let { markers = [] } = $$props;
  let { title } = $$props;
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0)
    $$bindings.step(step);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.markers === void 0 && $$bindings.markers && markers !== void 0)
    $$bindings.markers(markers);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css);
  return `${title ? `<h5 class="font-bold font-mono">${escape(title)}</h5>` : ``}
<div class="text-center"><input type="range"${add_attribute("min", min, 0)}${add_attribute("max", max, 0)}${add_attribute("id", id, 0)}${add_attribute("step", step, 0)} list="thisSlider" class="w-10/12 svelte-1k7wx0c"${add_attribute("value", value, 0)}></div>
${markers ? `<div id="thisSlider" class="w-10/12 justify-between flex font-mono m-auto"><span>${escape(markers[0])}</span>
        <span>${escape(markers[1])}</span></div>` : ``}`;
});
const IntersectionObserver_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let container;
  createEventDispatcher();
  return `<div${add_attribute("this", container, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Shader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let frag;
  let { u_time = 0 } = $$props;
  let { width = 300 } = $$props;
  let { height = 300 } = $$props;
  let { vertexShader } = $$props;
  let { fragmentShader } = $$props;
  let { slider = false } = $$props;
  let { sliderMin = 0 } = $$props;
  let { sliderMax = 100 } = $$props;
  let { sliderStep = 1 } = $$props;
  let { sliderMarkers = [] } = $$props;
  let { sliderTitle = "" } = $$props;
  let { sliderDefaultValue = 0 } = $$props;
  let value = 0;
  if (slider) {
    value = sliderDefaultValue;
  }
  let { editor = false } = $$props;
  let { legend = "" } = $$props;
  ({
    u_time: { value: 1 },
    u_resolution: { value: new Vector2() },
    u_mouse: { value: new Vector2() },
    u_slider: { value: 0 }
  });
  if ($$props.u_time === void 0 && $$bindings.u_time && u_time !== void 0)
    $$bindings.u_time(u_time);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.vertexShader === void 0 && $$bindings.vertexShader && vertexShader !== void 0)
    $$bindings.vertexShader(vertexShader);
  if ($$props.fragmentShader === void 0 && $$bindings.fragmentShader && fragmentShader !== void 0)
    $$bindings.fragmentShader(fragmentShader);
  if ($$props.slider === void 0 && $$bindings.slider && slider !== void 0)
    $$bindings.slider(slider);
  if ($$props.sliderMin === void 0 && $$bindings.sliderMin && sliderMin !== void 0)
    $$bindings.sliderMin(sliderMin);
  if ($$props.sliderMax === void 0 && $$bindings.sliderMax && sliderMax !== void 0)
    $$bindings.sliderMax(sliderMax);
  if ($$props.sliderStep === void 0 && $$bindings.sliderStep && sliderStep !== void 0)
    $$bindings.sliderStep(sliderStep);
  if ($$props.sliderMarkers === void 0 && $$bindings.sliderMarkers && sliderMarkers !== void 0)
    $$bindings.sliderMarkers(sliderMarkers);
  if ($$props.sliderTitle === void 0 && $$bindings.sliderTitle && sliderTitle !== void 0)
    $$bindings.sliderTitle(sliderTitle);
  if ($$props.sliderDefaultValue === void 0 && $$bindings.sliderDefaultValue && sliderDefaultValue !== void 0)
    $$bindings.sliderDefaultValue(sliderDefaultValue);
  if ($$props.editor === void 0 && $$bindings.editor && editor !== void 0)
    $$bindings.editor(editor);
  if ($$props.legend === void 0 && $$bindings.legend && legend !== void 0)
    $$bindings.legend(legend);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    frag = fragmentShader;
    $$rendered = `${editor ? `<div class="my-one w-full m-auto">${validate_component(CodeMirror, "CodeMirror").$$render(
      $$result,
      {
        lang: cpp(),
        extensions: [oneDark],
        styles: {
          "&": {
            padding: "5px",
            borderRadius: "10px",
            filter: "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
            fontSize: "0.8rem"
          },
          ".cm-content": { fontFamily: "'IBM Plex Mono'" },
          ".cm-gutters": { borderRadius: "10px" }
        },
        value: frag
      },
      {
        value: ($$value) => {
          frag = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>` : ``}

${validate_component(IntersectionObserver_1, "IntersectionObserver").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="flex justify-center my-one drop-shadow-md italic text-gray-500">${validate_component(ImageWrapper, "ImageWrapper").$$render(
          $$result,
          {
            right_label: legend,
            maxWidth: String(width)
          },
          {},
          {
            default: () => {
              return `${validate_component(Canvas, "Canvas").$$render($$result, { size: { width, height } }, {}, {
                default: () => {
                  return `${``}`;
                }
              })}`;
            }
          }
        )}</div>`;
      }
    })}

${slider ? `${validate_component(Slider, "Slider").$$render(
      $$result,
      {
        min: sliderMin,
        max: sliderMax,
        step: sliderStep,
        markers: sliderMarkers,
        title: sliderTitle,
        value
      },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const FragmentShaderSVG = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvas;
  return `<svg${add_attribute("width", 300, 0)}${add_attribute("height", 300, 0)}${add_attribute("this", canvas, 0)}></svg>`;
});
const FirstFrag = "varying vec2 vUv;\n\nvoid main() {\n  // Normalized pixel coordinates (from 0 to 1)\n  vec2 uv = vUv;\n\n  // redish in x, greenish in y\n  // Try to modify the following line to have a blue gradient\n  // from left to right.\n  gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0); // RGBA\n}";
const SimpleSDF = "uniform vec2 u_resolution;\nuniform float u_slider;\nuniform float u_time;\nvarying vec2 vUv;\n\nvoid main() {\n    // distance of the current pixel from the center of the screen\n    // 1 - distance to get brighter in the center\n    float d = 1. - distance(vUv, vec2(0.5)) * 2.;\n\n    // Using step to get a sharp circle\n    float c = step(0.5, d);\n\n    // Mix the two colors based on the slider\n    float o = mix(d, c, u_slider);\n\n    // Increase luminosity with distance to center\n    gl_FragColor = vec4(vec3(o), 1.0); //RGBA\n}";
const CircleFrag = "varying vec2 vUv;\nuniform float u_slider;\n\nfloat sdSphere(vec2 uv, vec2 center, float size)\n{\n  return 1. - distance(uv, center) / size;\n}\n\nvoid main() {\n    // Normalized pixel coordinates (from 0 to 1)\n    vec2 uv = vUv;\n\n    // distance of the current pixel from the center of the screen\n    // 1-distance to get brighter in the center\n    float d1 = sdSphere(uv, vec2(0.5), 1.0);\n    float d2 = sdSphere(uv, vec2(u_slider), 1.0);\n\n    // Set pixel color\n    vec3 color = vec3(0.0, 0.0, 0.0);\n    color.x = step(0.9,d1); // Red if close to d1\n    color.y = step(0.9,d2); // Green if close to d2\n\n    // Increase luminosity with distance to center\n    gl_FragColor = vec4(color, 1.0); //RGBA\n}";
const BlendFrag = "uniform float u_slider;\nvarying vec2 vUv;\n\nfloat sdSphere(vec2 uv, vec2 center, float size)\n{\n  return 1.0 - distance(uv, center) / size;\n}\n\n// Polynomial smooth min\nfloat smin(float a, float b, float k)\n{\n    float h = max( k-abs(a-b), 0.0 )/k;\n    return min( a, b ) - h*h*k*(1.0/4.0);\n}\n\n// smooth max\nfloat smax(float a, float b, float k)\n{\n    return -smin(-a, -b, k);\n}\n\nvoid main() {\n    // Normalized pixel coordinates (from 0 to 1)\n    vec2 uv = vUv;\n\n    // distance of the current pixel from the center of the screen\n    // 1-distance to get brighter in the center\n    float d1 = sdSphere(uv, vec2(0.6), .5);\n    float d2 = sdSphere(uv, vec2(u_slider), 0.5);\n\n    //float color = step(0.2, d1 + d2);\n    float color  = smax(d1,d2,0.3);\n    color = step(0.8, color);\n    \n   // float color = step(0.9, d1 + d2);\n\n    // Increase luminosity with distance to center\n    gl_FragColor = vec4(vec3(color), 1.0); //RGBA\n}";
const Blob01Frag = "uniform float u_time;\nvarying vec2 vUv;\nuniform float u_slider;\n\nfloat sdSphere(vec2 p, vec2 center, float size )\n{\n  return 1.0 - distance(p, center) / size;\n}\n\n// Polynomial smooth min\n// Iñigo Quílez\nfloat smin(float a, float b, float k)\n{\n    float h = max( k-abs(a-b), 0.0 )/k;\n    return min( a, b ) - h*h*k*(1.0/4.0);\n}\n\nfloat smax(float a, float b, float k) {\n    return -smin(-a, -b, k);\n}\n\nfloat map(float x, float in_min, float in_max, float out_min, float out_max)\n{\n  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n}\n\nvoid main() {\n	  vec2 st = vUv;\n\n    // Define the center of each metaball\n    vec2 c1 = vec2(0.4, map(cos(u_time), -1., 1., 0.3, 0.4));\n    vec2 c2 = vec2(map(sin(u_time), -1., 1., 0.4, 0.7), 0.5);\n    vec2 c3 = vec2(0.5, map(cos(u_time), -1., 1., 0.6, 0.7));\n    vec2 c4 = vec2(map(cos(u_time), -1., 1., 0.4, 0.63), 0.3);\n\n    // Calculate the distance to each metaball\n    float d1 = sdSphere(st, c1, 0.772);\n    float d2 = sdSphere(st, c2, 0.996);\n    float d3 = sdSphere(st, c3, 0.908);\n    float d4 = sdSphere(st, c4, 1.028);\n\n    float k = 0.4;\n    // Calculate the metaball\n    float metaalt =  smax(d1 ,d2, k);\n    metaalt = smax(metaalt, d3, k);\n    metaalt = smax(metaalt, d4, k);\n    metaalt = step(u_slider, metaalt);\n    \n    \n    //gl_FragColor = vec4(, 1.0);\n    //gl_FragColor = vec4(vec3(metaball), 1.0);\n    gl_FragColor = vec4(vec3(metaalt), 1.0);\n}";
const metadata = {
  "title": "My journey into shaders",
  "subtitle": "Chapter I: The blob",
  "date": "2021-05-01T00:00:00.000Z",
  "readingTime": 5,
  "category": "computer graphics",
  "tags": ["shaders", "interactive"]
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const vertexShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif
     varying vec2 vUv;
     void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0 );
        }
    `;
  let uniforms$1 = uniforms;
  uniforms$1.resolution.value.x = 200;
  uniforms$1.resolution.value.y = 200;
  uniforms$1.mouse.value.x = 0;
  uniforms$1.mouse.value.y = 0;
  new Clock();
  console.log(uniforms$1);
  return `${validate_component(PostLayout, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign({}, $$props, metadata), {}, {
    default: () => {
      return `<blockquote><p><em>This article is interactive. Make sure javascript is enabled and have fun!</em></p></blockquote>
<p>For a couple of years now, I’ve been fascinated by shaders. However, each time I tried to learn, it was not even like learning a new language, it was like learning how to read and write. I was completely lost.
When I decided to port my personal website to svelte, I wanted to re-create the little animation on the front page, but using shaders instead of css. Initially, the CSS animation was a simple <code>border-radius</code> animation that looked like this:</p>
<div class="py-one">${validate_component(Css_blob, "CssBlob").$$render($$result, {}, {}, {})}</div>
<p>Why would I do that you may ask? For fun, and performance. The animation above may run relatively smoothly but is highly inefficient. And the effect is the perfect balance between challenge and result.</p>
<h2>Shaders?</h2>
<p>A shader is a small program that runs on your GPU, in contrast with traditional programs running on the CPU. The main difference is that the GPU is highly parallelized, meaning that it can run the same program for all the pixels on the screen (not really, but you can think of it like that). This is why shaders are so efficient at rendering graphics. The downside is that, because it is a low-level parallelized language, it is extremely hard to understand at first.</p>
${validate_component(FragmentShaderSVG, "FragmentShaderSVG").$$render($$result, {}, {}, {})}
<p>Basically, a shader takes a pixel (coordinates x and y) and outputs a color (as rgba). This is called a fragment shader (It is also possible to output a position, which is called a vertex shader, but we won’t need that here). You can also pass properties to the shader, called uniforms, which are equal for all the pixels (hence <em>uniforms</em>). For example, the resolution of the screen is a uniform. Because the size of the shader canvas can change, we usually pass the resolution as a uniform and normalize the coordinates between 0 and 1.</p>
<p>Here is a simple shader that outputs a gradient of red from left to right and green from bottom to top:</p>
${validate_component(Shader, "Shader").$$render(
        $$result,
        {
          fragmentShader: FirstFrag,
          vertexShader,
          editor: true,
          legend: "A shader. Impressive?"
        },
        {},
        {}
      )}
<p>There are a few interesting things to note here about the syntax:</p>
<ul><li>The lower left corner is the origin of the canvas.</li>
<li>All variables are typed and there is support for many linear algebra operations.</li>
<li>Vectors elements are accessed using the dot notation (e.g. <code>vec2(1, 2).x</code> is 1)</li>
<li>You can access sub-vectors using the <code>xy</code> notation (e.g. <code>vec4(1, 2, 3, 4).xy</code> is <code>vec2(1, 2)</code>)</li>
<li>There is not <code>return</code> statement, the color of the pixel is the value taken by the variable <code>gl_FragColor</code> at the end of the program.</li></ul>
<h2>Signed distance functions</h2>
<p>Now, to reproduce my blob, I’d like to draw a circle. While this may seem trivial, it is not. In a shader, you can’t draw elementary shapes, more precisely, you can’t <strong>draw</strong> anything. You can only output a color for each pixel. So how do you draw a circle? The answer is: you don’t. What you can do however, Is to output a different color for pixel given their distance to the center of the circle. This way of drawing shapes is called a signed distance function (SDF). For example, we can increase the luminosity when they are closer to the center of the canvas. This can be computed with basic trigonometry, however, GLSL has a built-in function for that: <code>distance</code>. If now we really want to draw a circle, we need a way to transform this distance that is a continuous value into a binary pixel brightness that is either 0 or 1. This is provided by the step function, which takes a threshold and returns 0 if the value is below the threshold and 1 otherwise.</p>
${validate_component(Shader, "Shader").$$render(
        $$result,
        {
          fragmentShader: SimpleSDF,
          vertexShader,
          slider: "true",
          sliderDefaultValue: 0,
          sliderMin: 0,
          sliderMax: 1,
          sliderStep: 0.01,
          u_time: uniforms$1.time.value,
          sliderTitle: "Slide to the right to apply the step() function",
          sliderMarkers: ["<distance()", "step()>"],
          editor: true,
          legend: "Distance from (0.5,0.5)"
        },
        {},
        {}
      )}
<h2>More circles</h2>
<p>To make our life easier, we can define a function for this SDF. This way, we can draw multiple circles that can become the fundamental building blocks of our blob. We can also add a parameter to control the size of the circle by multiplying the distance by a factor.</p>
${validate_component(Shader, "Shader").$$render(
        $$result,
        {
          fragmentShader: CircleFrag,
          vertexShader,
          slider: "true",
          sliderDefaultValue: 0,
          sliderMin: 0,
          sliderMax: 1,
          sliderStep: 0.01,
          sliderTitle: "Slide to change the green circle coordinates",
          sliderMarkers: ["(0,0)", "(1,1)"],
          legend: '"Let there be Colors"'
        },
        {},
        {}
      )}
<h2>Blending</h2>
<p>To create an appealing effect, we would like that our shapes blend together like what you would see in a lava lamp. Surprisingly, this is easy to make. If instead of using the step function on each circle, we use it on the <em>sum</em> of the two distances, we then get something much more interesting.</p>
${validate_component(Shader, "Shader").$$render(
        $$result,
        {
          fragmentShader: BlendFrag,
          vertexShader,
          slider: true,
          sliderDefaultValue: 0,
          sliderMin: 0,
          sliderMax: 1,
          sliderStep: 0.01,
          sliderTitle: "Slide to get the two circle close together",
          sliderMarkers: null,
          legend: "Satisfying blending"
        },
        {},
        {}
      )}
<h2>An animated blob</h2>
<p>We can pass any uniform to our shader, including the time. This way, we can animate our blob by moving the circles around. With a
few more circles, we can get something that looks like a blob.</p>
${validate_component(Shader, "Shader").$$render(
        $$result,
        {
          fragmentShader: Blob01Frag,
          vertexShader,
          legend: "It's a blob!",
          u_time: uniforms$1.time.value,
          slider: true,
          sliderDefaultValue: 0.9,
          sliderMin: 0.85,
          sliderMax: 0.99,
          sliderStep: 1e-3,
          sliderTitle: "Adjust the size of the metaballs",
          sliderMarkers: null
        },
        {},
        {}
      )}
`;
    }
  })}`;
});
export {
  Page as default,
  metadata
};
