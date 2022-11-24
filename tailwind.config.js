/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html',
  './src/**/*.{html,js}'],
  theme: {
    "colors": {
      "ceca-color": {
        "50": "#fffff5",
        "100": "#fffaeb",
        "200": "#fcf0e1",
        "300": "#f2e6d7",
        "400": "#e8dccd",
        "500": "#ded2c3",
        "600": "#d4c8b9",
        "700": "#cabeaf",
        "800": "#c0b4a5",
        "900": "#b6aa9b",
        "button-color" : "#FFFF",
        "login-background": "#347AF0",
        "labels": "#eef1f8",
        "green": "#75BF72",
        "red": "#DF5060",
        "dark-grey": "#3D4C63",
        "red-pastel": "#ff6961",
        "min-width" : "87px",
        
      }
    },
    extend: {},
  },
  plugins: [],
  
}