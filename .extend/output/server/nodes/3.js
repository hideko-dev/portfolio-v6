

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contact/_page.svelte.js')).default;
export const imports = ["_svelte/immutable/nodes/3.bdd2bc5f.js","_svelte/immutable/chunks/scheduler.abd4628c.js","_svelte/immutable/chunks/index.d9f5b77c.js","_svelte/immutable/chunks/pageTitle.7b513562.js","_svelte/immutable/chunks/Toaster.svelte_svelte_type_style_lang.68349171.js","_svelte/immutable/chunks/index.5ba2287e.js"];
export const stylesheets = ["_svelte/immutable/assets/3.1cc78f74.css","_svelte/immutable/assets/pageTitle.995424ea.css","_svelte/immutable/assets/Toaster.3a6d0da3.css"];
export const fonts = [];
