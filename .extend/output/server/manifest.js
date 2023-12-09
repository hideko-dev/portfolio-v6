export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.a1fe9b9d.js","app":"_app/immutable/entry/app.0062f9d4.js","imports":["_app/immutable/entry/start.a1fe9b9d.js","_app/immutable/chunks/scheduler.05577254.js","_app/immutable/chunks/singletons.23460fc6.js","_app/immutable/chunks/index.8b46c88b.js","_app/immutable/entry/app.0062f9d4.js","_app/immutable/chunks/scheduler.05577254.js","_app/immutable/chunks/index.36e0c5a6.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: __memo(() => import('./entries/endpoints/_server.js'))
			},
			{
				id: "/index",
				pattern: /^\/index\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
