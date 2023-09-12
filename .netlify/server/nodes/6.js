

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.01827c8e.js","_app/immutable/chunks/index.abcf0ec6.js"];
export const stylesheets = [];
export const fonts = [];
