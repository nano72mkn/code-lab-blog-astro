/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      aspectRatio: {
        ogImage: "1.91 / 1",
      },
    },
  },
  plugins: [],
  important: true,
};
