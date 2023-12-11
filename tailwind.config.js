/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      container: {
        padding: '24px',
        screens: {
          lg: '1440px',
        },
      }
    },
  },
  plugins: [],
}