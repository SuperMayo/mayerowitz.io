

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.3cc23d53.js","_app/immutable/chunks/index.abcf0ec6.js"];
export const stylesheets = [];
export const fonts = [];
