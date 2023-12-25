import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const config = {
	preprocess: preprocess({
		postcss: true,
	}),
	kit: {
		adapter: adapter({
			include: ['/*'],
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