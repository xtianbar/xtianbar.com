/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
            "./*.{html,js}"],
  theme: {
    colors: {
      'mostly-black': "#303030",
      'blu': "#558AC8",
      'gray-bg': "#F6F6F6",
      'light-blu': "#68a1e3"
    },
    extend: {
      fontFamily: {
        open: "'Open Sans', serif",
      }
    },
  },
  plugins: [],
}
