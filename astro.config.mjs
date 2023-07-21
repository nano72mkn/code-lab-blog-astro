import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/static";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://code-lab-blog-astro.vercel.app/",
  integrations: [
    mdx({
      optimize: {
        customComponentNames: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "a"],
      },
    }),
    sitemap(),
    tailwind(),
    react(),
  ],
  output: "static",
  adapter: vercel(),
  vite: {
    optimizeDeps: {
      exclude: ["satori", "@resvg/resvg-js", "rss-parser"],
    },
  },
});
