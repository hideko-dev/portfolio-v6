

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ea06ad26.js","_app/immutable/chunks/scheduler.c9434609.js","_app/immutable/chunks/index.dff531d3.js","_app/immutable/chunks/singletons.97af3b26.js","_app/immutable/chunks/index.0a22982d.js"];
export const stylesheets = [];
export const fonts = [];
