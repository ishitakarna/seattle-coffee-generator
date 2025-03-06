export async function GET() {
  const SEATTLE_BOUNDS = "47.495,-122.435,47.735,-122.235"; 
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="cafe"]["website"]["name"!="Starbucks"](${SEATTLE_BOUNDS});
      way["amenity"="cafe"]["website"]["name"!="Starbucks"](${SEATTLE_BOUNDS});
      relation["amenity"="cafe"]["website"]["name"!="Starbucks"](${SEATTLE_BOUNDS});
    );
    out center;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    
    // Debugging: Log if the API request fails
    if (!response.ok) {
      console.error("Overpass API Error:", response.status, await response.text());
      return new Response(JSON.stringify({ error: "Overpass API request failed" }), { status: 500 });
    }

    const data = await response.json();

    if (!data.elements) {
      return new Response(JSON.stringify({ error: "No data received from Overpass" }), { status: 500 });
    }

    // Extract relevant information
    const cafes = data.elements
      .filter((element:any) => element.tags?.website)
      .map((element:any) => ({
        id: element.id,
        name: element.tags.name || "Unknown Cafe",
        website: element.tags.website,
        lat: element.lat || element.center?.lat,
        lon: element.lon || element.center?.lon,
      }));

    return new Response(JSON.stringify(cafes), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch cafes" }), { status: 500 });
  }
}
