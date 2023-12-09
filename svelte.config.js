import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapter({
			fallback: 'fallback.html'
		}),
		outDir: ".extend",
		files: {
			routes: "src/pages",
			appTemplate: "./static.html"
		}
	},
};

export default config