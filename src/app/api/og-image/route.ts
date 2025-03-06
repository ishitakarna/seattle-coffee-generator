import { fetchOgImage } from "@/utils/fetchOgImage";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const websiteUrl = searchParams.get("url");

  if (!websiteUrl) {
    return Response.json({ error: "Missing URL" }, { status: 400 });
  }

  const image = await fetchOgImage(websiteUrl);
  if (!image) {
    return Response.json({ error: "No OG image found" }, { status: 404 });
  }

  return Response.json({ image });
}
