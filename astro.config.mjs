import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import remarkBreaks from "remark-breaks";
import remarkCodeTitle from "remark-flexible-code-titles";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://code-lab.xyz/",
  prefetch: true,
  integrations: [
    mdx({
      optimize: {
        customComponentNames: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "a",
          "ul",
          "li",
          "code",
          "pre",
        ],
      },
      shikiConfig: {
        theme: "material-theme-palenight",
      },
    }),
    sitemap(),
    tailwind(),
    react(),
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
  markdown: {
    remarkPlugins: [
      remarkBreaks,
      [
        remarkCodeTitle,
        {
          title: true,
          titleClassName: "rounded-t-md bg-gray-200 px-5 py-4 text-gray-600",
          containerClassName:
            "rounded-md bg-sky-950 my-5 shadow-md overflow-hidden",
        },
      ],
    ],
    extendDefaultPlugins: true,
  },
  vite: {
    optimizeDeps: {
      exclude: ["satori", "@resvg/resvg-js", "rss-parser"],
    },
  },
});
