import ogpParser from "ogp-parser";
import type { APIRoute } from "astro";

export type OgpResponseType = {
  title: string;
  domain: string;
  favicon: string;
  ogp: {
    ogTitle: string;
    ogUrl: string;
    ogImage: string;
    ogSiteName: string;
  };
  seo: {
    description: string;
  };
};

export const get: APIRoute = async ({ params, request, props }) => {
  console.log({ request: request.text, props });
  //   if (!request.query.url) {
  return new Response(null, {
    status: 200,
    statusText: "Error",
  });
  //   }

  //   const url = new URL(req.query.url as string);
  //   const ogp = await ogpParser(url.href, { skipOembed: true });
};
