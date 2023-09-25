import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundColor: {
				// primary: '#1c1c1d',
				primary: 'rgba(0, 0, 0, 0.95)',
				'accent-one': '#f0f0f0',
				'accent-light': '#eedcb6',
				'accent-mid': '#ecc97c',
				'accent-dark': '#eab643',
				'blueish-gray': '#6b7c93',
			},
			colors: {
				'accent-one': '#f0f0f0',
				'accent-light': '#eedcb6',
				'accent-mid': '#ecc97c',
				'accent-dark': '#eab643',
			},
			transitionTimingFunction: {
				'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
				bezier: 'cubic-bezier(0, .22, .51, .83)',
			},
		},
	},
	plugins: [],
};
export default config;
