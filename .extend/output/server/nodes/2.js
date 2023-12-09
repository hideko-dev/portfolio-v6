

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.4b5ba9d0.js","_app/immutable/chunks/scheduler.05577254.js","_app/immutable/chunks/index.36e0c5a6.js","_app/immutable/nodes/3.33ec516f.js","_app/immutable/chunks/theme.397adb53.js","_app/immutable/chunks/index.8b46c88b.js"];
export const stylesheets = [];
export const fonts = [];
