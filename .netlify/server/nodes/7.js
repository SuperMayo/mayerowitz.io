

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.757ffc98.js","_app/immutable/chunks/index.12c69e40.js"];
export const stylesheets = [];
export const fonts = [];
