/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			width: {
				"70": "19rem"
			},
			fontSize: {
				"prop": ".9rem"
			}
		},
	},
	plugins: [
		require("tw-elements/dist/plugin"),
		require("tailwind-scrollbar-hide"),
	],
};
