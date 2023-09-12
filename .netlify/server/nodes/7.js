

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/research/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.d1ac688b.js","_app/immutable/chunks/index.abcf0ec6.js"];
export const stylesheets = ["_app/immutable/assets/7.5a4c9dec.css"];
export const fonts = [];
