import * as universal from '../entries/pages/gallery/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gallery/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/gallery/+page.js";
export const imports = ["_app/immutable/nodes/5.ed754981.js","_app/immutable/chunks/index.abcf0ec6.js","_app/immutable/chunks/ImageWrapper.ed8bd773.js"];
export const stylesheets = [];
export const fonts = [];
