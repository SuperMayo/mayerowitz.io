import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.d586b8b1.js","_app/immutable/chunks/index.12c69e40.js"];
export const stylesheets = ["_app/immutable/assets/0.583626c3.css"];
export const fonts = [];
