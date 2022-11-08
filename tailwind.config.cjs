/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },

  // active card 
  variants: 
    ['reponsive', 'hover', 'focus','active'],
    
  plugins: [],
}
