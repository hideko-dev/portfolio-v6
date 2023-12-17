import adapter from '@sveltejs/adapter-vercel';

const config = {
	kit: {
		adapter: adapter({
			fallback: './stands/fallback.html'
		}),
		appDir: "_svelte",
		outDir: ".extend",
		files: {
			routes: "src/pages",
			appTemplate: "./stands/static.html"
		}
	},
};

export default config