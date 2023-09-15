

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/research/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.9f6214b4.js","_app/immutable/chunks/index.12c69e40.js"];
export const stylesheets = ["_app/immutable/assets/8.5a4c9dec.css"];
export const fonts = [];
