/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        main: {
          100 :"#CDF3EB",
          200: "#9AE7D8",
          300: "#68DBC4",
          400: "#35CFB1",
          500: "#03C39D"
        },
        alternative: {
          100 :"#F3CDD4",
          200: "#E79AA9",
          300: "#DB687F",
          400: "#CF3554",
          500: "#C30329"
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
})

