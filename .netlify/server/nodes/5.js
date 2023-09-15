

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/nobel-prizes/_page.svx.js')).default;
export const imports = ["_app/immutable/nodes/5.fc38d01a.js","_app/immutable/chunks/index.12c69e40.js","_app/immutable/chunks/PostLayout.7c6a2228.js","_app/immutable/chunks/preload-helper.cf010ec4.js","_app/immutable/chunks/index.accfc049.js"];
export const stylesheets = [];
export const fonts = [];
