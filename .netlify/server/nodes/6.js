import * as universal from '../entries/pages/gallery/_page.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gallery/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/gallery/+page.js";
export const imports = ["_app/immutable/nodes/6.188394ce.js","_app/immutable/chunks/index.12c69e40.js","_app/immutable/chunks/ImageWrapper.78ae265b.js"];
export const stylesheets = [];
export const fonts = [];
