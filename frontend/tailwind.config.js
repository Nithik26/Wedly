module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#6d8a9a',
        secondary: '#d1c4e9',
        text: '#333333',
        background: '#ffffff',
        'light-gray': '#f4f4f4',
        border: '#dddddd',
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
