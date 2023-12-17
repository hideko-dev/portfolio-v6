export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_svelte",
	appPath: "_svelte",
	assets: new Set(["favicon.ico"]),
	mimeTypes: {},
	_: {
		client: {"start":"_svelte/immutable/entry/start.e23bf8b8.js","app":"_svelte/immutable/entry/app.33571d5f.js","imports":["_svelte/immutable/entry/start.e23bf8b8.js","_svelte/immutable/chunks/scheduler.abd4628c.js","_svelte/immutable/chunks/singletons.7480d111.js","_svelte/immutable/chunks/index.5ba2287e.js","_svelte/immutable/entry/app.33571d5f.js","_svelte/immutable/chunks/scheduler.abd4628c.js","_svelte/immutable/chunks/index.d9f5b77c.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: __memo(() => import('../output/server/entries/endpoints/_server.js'))
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/index",
				pattern: /^\/index\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/works",
				pattern: /^\/works\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
