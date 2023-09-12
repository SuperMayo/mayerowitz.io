

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.7b69c5a5.js","_app/immutable/chunks/index.abcf0ec6.js","_app/immutable/chunks/singletons.f947dd8c.js","_app/immutable/chunks/index.506b5c70.js"];
export const stylesheets = [];
export const fonts = [];
