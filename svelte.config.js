import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapter({
			fallback: './stands/fallback.html'
		}),
		outDir: ".extend",
		files: {
			routes: "src/pages",
			appTemplate: "./stands/static.html"
		}
	},
};

export default config