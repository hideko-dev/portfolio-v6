

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_svelte/immutable/nodes/1.786abfc3.js","_svelte/immutable/chunks/scheduler.abd4628c.js","_svelte/immutable/chunks/index.b42942e1.js","_svelte/immutable/chunks/singletons.5eb8fa98.js","_svelte/immutable/chunks/index.5ba2287e.js"];
export const stylesheets = [];
export const fonts = [];
