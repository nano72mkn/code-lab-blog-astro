const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Noto Sans JP"',
          '"Noto Color Emoji"',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      aspectRatio: {
        ogImage: "1.91 / 1",
      },
    },
  },
  plugins: [],
  important: true,
};
