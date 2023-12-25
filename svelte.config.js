import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

const config = {
	preprocess: preprocess({
		postcss: true,
	}),
	kit: {
		paths: {
			base: "/"
		},
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