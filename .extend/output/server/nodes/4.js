

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/index/_page.svelte.js')).default;
export const imports = ["_svelte/immutable/nodes/4.0cb2f033.js","_svelte/immutable/chunks/scheduler.abd4628c.js","_svelte/immutable/chunks/index.d9f5b77c.js","_svelte/immutable/chunks/pageTitle.7b513562.js","_svelte/immutable/chunks/index.6ee09c79.js","_svelte/immutable/chunks/index.5ba2287e.js","_svelte/immutable/chunks/cms.d7f50a18.js"];
export const stylesheets = ["_svelte/immutable/assets/4.7454a12d.css","_svelte/immutable/assets/pageTitle.995424ea.css","_svelte/immutable/assets/index.af927694.css"];
export const fonts = [];
