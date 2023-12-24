

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/works/_page.svelte.js')).default;
export const imports = ["_svelte/immutable/nodes/5.14e31fdc.js","_svelte/immutable/chunks/scheduler.abd4628c.js","_svelte/immutable/chunks/index.b42942e1.js","_svelte/immutable/chunks/index.9014b818.js","_svelte/immutable/chunks/pageTitle.503e0206.js","_svelte/immutable/chunks/cms.6cec21ef.js"];
export const stylesheets = ["_svelte/immutable/assets/5.00038da3.css","_svelte/immutable/assets/index.32503cb2.css","_svelte/immutable/assets/pageTitle.0bbcfdf8.css"];
export const fonts = [];
