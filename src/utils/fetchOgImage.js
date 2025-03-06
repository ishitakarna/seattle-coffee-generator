import * as cheerio from "cheerio";

export async function fetchOgImage(url) {
  if (!url) throw new Error("Missing URL");

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!response.ok) throw new Error("Failed to fetch page");

    const html = await response.text();
    const $ = cheerio.load(html);

    // Try different sources for an image
    return (
      $("img").first().attr("src") || // First <img>
      $('meta[property="og:image"]').attr("content") || // OG Image
      null
    );
  } catch (error) {
    console.error(`Error fetching image for ${url}:`, error);
    return null;
  }
}
