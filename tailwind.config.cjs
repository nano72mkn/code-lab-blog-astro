const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Noto Sans JP Variable"',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      aspectRatio: {
        ogImage: "1.91 / 1",
      },
      animation: {
        "tracking-in-expand": "tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both",
        "about-card": "about-card 5s both",
        "about-card-icon": "about-card-icon 5s both",
      },
      keyframes: {
        "tracking-in-expand": {
          "0%": {
            "letter-spacing": "-.5em",
            opacity: "0"
          },
          "40%": {
            opacity: ".6"
          },
          to: {
            opacity: "1"
          }
        },
        "about-card": {
          "0%": {
            height: "0",
            width: "0",
          },
          "10%": {
            height: "5px",
            width: "10px",
          },
          "30%": {
            height: "5px",
            width: "400px",
          },
          "90%": {
            height: "5px",
            width: "400px",
          },
          "100%": {
            height: "250px",
            width: "400px",
          }
        },
        "about-card-icon": {
          "0%": {
            height: "0",
            width: "0",
          },
          "90%": {
            height: "0",
            width: "0",
          },
          "100%": {
            height: "150px",
            width: "150px",
          }
        }
      }
    },
  },
  plugins: [],
  important: true,
};
