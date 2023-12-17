

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.df7bd388.js","_app/immutable/chunks/scheduler.abd4628c.js","_app/immutable/chunks/index.4ad3ea3a.js","_app/immutable/chunks/singletons.15d22da3.js","_app/immutable/chunks/index.5ba2287e.js"];
export const stylesheets = [];
export const fonts = [];
