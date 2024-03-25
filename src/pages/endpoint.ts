export async function GET({ request }) {
    return new Response("Vercel Edge CDN will save and reuse this response for about 60 seconds.", {
        headers: { "Cache-Control": "s-maxage=60" }
    })
}
