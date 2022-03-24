const plugin = require('tailwindcss/plugin')

module.exports = {
content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
	fontFamily: {
		sans: ['InterVariable', 'ui-sans-serif', 'system-ui'],
	},
  },
  plugins: [],
}
