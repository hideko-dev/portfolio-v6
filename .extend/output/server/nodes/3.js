

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/index/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.69412e12.js","_app/immutable/chunks/scheduler.c9434609.js","_app/immutable/chunks/index.dff531d3.js"];
export const stylesheets = [];
export const fonts = [];
