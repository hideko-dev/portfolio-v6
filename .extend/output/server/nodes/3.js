

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contact/_page.svelte.js')).default;
export const imports = ["_svelte/immutable/nodes/3.c6a756b6.js","_svelte/immutable/chunks/scheduler.abd4628c.js","_svelte/immutable/chunks/index.b42942e1.js","_svelte/immutable/chunks/pageTitle.503e0206.js","_svelte/immutable/chunks/Toaster.svelte_svelte_type_style_lang.c1062644.js","_svelte/immutable/chunks/index.5ba2287e.js"];
export const stylesheets = ["_svelte/immutable/assets/3.da31eae2.css","_svelte/immutable/assets/pageTitle.0bbcfdf8.css","_svelte/immutable/assets/Toaster.5032d475.css"];
export const fonts = [];
