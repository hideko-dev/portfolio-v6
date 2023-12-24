

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_svelte/immutable/nodes/2.41c68a51.js","_svelte/immutable/chunks/scheduler.abd4628c.js","_svelte/immutable/chunks/index.b42942e1.js","_svelte/immutable/nodes/4.9abe3fba.js","_svelte/immutable/chunks/pageTitle.503e0206.js","_svelte/immutable/chunks/index.9014b818.js","_svelte/immutable/chunks/index.5ba2287e.js","_svelte/immutable/chunks/cms.6cec21ef.js"];
export const stylesheets = ["_svelte/immutable/assets/4.8b2c4f3d.css","_svelte/immutable/assets/pageTitle.0bbcfdf8.css","_svelte/immutable/assets/index.32503cb2.css"];
export const fonts = [];
