import type { APIContext } from "astro";
import { getCollection, getEntryBySlug } from "astro:content";
import { createOgp } from "@utils/createOgp";

export const prerender = true;

export async function getStaticPaths() {
  const posts: { slug: any }[] = await getCollection(
    "blog",
    ({ data }) => data.published === true
  );

  posts.push({ slug: "ogp" });

  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
}

export async function GET({ params }: APIContext) {
  const { slug } = params;
  if (!slug) return { status: 404 };

  let title = "No title";

  if (slug === "ogp") {
    title = "Code Lab.";
  } else {
    const blog = await getEntryBySlug("blog", slug);
    if (!blog) return { status: 404 };

    title = blog.data.title ?? "No title";
  }

  try {
    const buffer = await createOgp({ title });
    return new Response(buffer);
    //   {
    //   body: buffer,
    //   encoding: "binary",
    // };
  } catch (e) {
    console.error(e);
    return { status: 500 };
  }
}
