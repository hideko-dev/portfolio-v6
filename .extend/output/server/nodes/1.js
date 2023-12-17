

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_svelte/immutable/nodes/1.eab6cb36.js","_svelte/immutable/chunks/scheduler.abd4628c.js","_svelte/immutable/chunks/index.d9f5b77c.js","_svelte/immutable/chunks/singletons.7480d111.js","_svelte/immutable/chunks/index.5ba2287e.js"];
export const stylesheets = [];
export const fonts = [];
