

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/index/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.89fb5b15.js","_app/immutable/chunks/scheduler.abd4628c.js","_app/immutable/chunks/index.4ad3ea3a.js","_app/immutable/chunks/pageTitle.65987456.js","_app/immutable/chunks/index.67959e06.js","_app/immutable/chunks/index.5ba2287e.js","_app/immutable/chunks/cms.d7f50a18.js"];
export const stylesheets = ["_app/immutable/assets/4.7454a12d.css","_app/immutable/assets/pageTitle.995424ea.css","_app/immutable/assets/index.af927694.css"];
export const fonts = [];
