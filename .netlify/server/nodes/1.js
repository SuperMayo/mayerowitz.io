

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.f2c52619.js","_app/immutable/chunks/index.12c69e40.js","_app/immutable/chunks/singletons.2fddb022.js","_app/immutable/chunks/index.accfc049.js"];
export const stylesheets = [];
export const fonts = [];
