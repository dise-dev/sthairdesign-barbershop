/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#343a40',
        midgray: '#808080',
        offwhite: '#F8F9FA',
        forest: 'rgb(29 164 98)',
        burgundy: '#7B1F34',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
  corePlugins: {
    borderRadius: false,
  },
};
