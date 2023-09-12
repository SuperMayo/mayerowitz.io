

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.94893124.js","_app/immutable/chunks/index.abcf0ec6.js","_app/immutable/chunks/T.19078dc9.js","_app/immutable/chunks/index.506b5c70.js"];
export const stylesheets = ["_app/immutable/assets/2.6e8b8ffc.css","_app/immutable/assets/T.2388fa67.css"];
export const fonts = [];
