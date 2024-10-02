import { resolve } from "path";

const packageName = 'bcj-ckeditor5';

export default {
	server: {
		open: 'index.html'
	},

	build: {
		lib: {
			entry: resolve(__dirname, "main.js"),
			name: packageName,
			fileName: "index",
			formats: ["es", "cjs"],
		},
	},
};
