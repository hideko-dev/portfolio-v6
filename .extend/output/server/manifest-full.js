export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico"]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.2e4b44df.js","app":"_app/immutable/entry/app.e19a2874.js","imports":["_app/immutable/entry/start.2e4b44df.js","_app/immutable/chunks/scheduler.c9434609.js","_app/immutable/chunks/singletons.97af3b26.js","_app/immutable/chunks/index.0a22982d.js","_app/immutable/entry/app.e19a2874.js","_app/immutable/chunks/scheduler.c9434609.js","_app/immutable/chunks/index.dff531d3.js"],"stylesheets":[],"fonts":[]},
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
