import type { APIContext } from "astro";
import { getCollection, getEntryBySlug } from "astro:content";
import { createOgp } from "../../utils/createOgp";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
}

export async function get({ params }: APIContext) {
  const { slug } = params;
  if (!slug) return { status: 404 };

  const blog = await getEntryBySlug("blog", slug);
  if (!blog) return { status: 404 };

  const title = blog.data.title ?? "No title";

  try {
    const buffer = await createOgp({ title });
    console.log(buffer);
    return {
      // headers: {
      //   "Content-Type": "image/png",
      //   "Cache-Control": "public, max-age=31536000, immutable",
      // },
      body: buffer,
      encoding: "binary",
    };
  } catch (e) {
    console.error(e);
    return { status: 500 };
  }
}