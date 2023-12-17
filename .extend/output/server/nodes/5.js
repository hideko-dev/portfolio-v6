

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/works/_page.svelte.js')).default;
export const imports = ["_svelte/immutable/nodes/5.13592616.js","_svelte/immutable/chunks/scheduler.abd4628c.js","_svelte/immutable/chunks/index.d9f5b77c.js","_svelte/immutable/chunks/index.6ee09c79.js","_svelte/immutable/chunks/pageTitle.7b513562.js","_svelte/immutable/chunks/cms.d7f50a18.js"];
export const stylesheets = ["_svelte/immutable/assets/5.e360a44b.css","_svelte/immutable/assets/index.af927694.css","_svelte/immutable/assets/pageTitle.995424ea.css"];
export const fonts = [];
