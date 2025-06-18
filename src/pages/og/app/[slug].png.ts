import type { APIContext } from "astro";
import { getAppConfig, apps } from "@config/apps";
import { createAppOgp } from "@utils/createAppOgp";

export const prerender = true;

export async function getStaticPaths() {
  // showInServicesがtrueのアプリのみOGP画像を生成
  const appSlugs = Object.keys(apps).filter(slug => apps[slug].showInServices);
  
  return appSlugs.map((slug) => ({
    params: { slug },
  }));
}

export async function GET({ params }: APIContext) {
  const { slug } = params;
  if (!slug) return new Response(null, { status: 404 });

  try {
    const app = getAppConfig(slug);
    
    if (!app.showInServices) {
      return new Response(null, { status: 404 });
    }
    
    const buffer = await createAppOgp({ app });
    
    return new Response(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e) {
    console.error("OGP画像の生成に失敗しました:", e);
    return new Response(null, { status: 500 });
  }
}