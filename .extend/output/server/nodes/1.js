

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.c3c791ab.js","_app/immutable/chunks/scheduler.05577254.js","_app/immutable/chunks/index.36e0c5a6.js","_app/immutable/chunks/singletons.23460fc6.js","_app/immutable/chunks/index.8b46c88b.js"];
export const stylesheets = [];
export const fonts = [];
