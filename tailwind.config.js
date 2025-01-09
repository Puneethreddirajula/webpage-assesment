/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'blue-header': '#052949',
      'grey-background': '#f6f8fa',
      'grey-arrow': 'rgb(224,224,225)',
      'grey-text': '#4a5b70',
      'white': '#ffffff',
      'text-color': '#37475b'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}

