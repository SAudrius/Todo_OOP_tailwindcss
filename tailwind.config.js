const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],

  theme: {
    extend: {
      colors: {
        primary: "#3C5BC7",
        secondary: "#2A0746",
        ancient: "#12041D",
      },
    },
    fontFamily: {
      mont: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
