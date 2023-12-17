

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/works/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.e5f2688d.js","_app/immutable/chunks/scheduler.abd4628c.js","_app/immutable/chunks/index.4ad3ea3a.js","_app/immutable/chunks/index.67959e06.js","_app/immutable/chunks/pageTitle.65987456.js","_app/immutable/chunks/cms.d7f50a18.js"];
export const stylesheets = ["_app/immutable/assets/5.1c635ad0.css","_app/immutable/assets/index.af927694.css","_app/immutable/assets/pageTitle.995424ea.css"];
export const fonts = [];
