

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/teaching/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.f1d3da0f.js","_app/immutable/chunks/index.abcf0ec6.js"];
export const stylesheets = [];
export const fonts = [];
