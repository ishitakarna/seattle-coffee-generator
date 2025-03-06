"use client";
import { useEffect, useState } from "react";
import CoffeeGrid from "@/components/CoffeeGrid";
import { FaDice } from "react-icons/fa"; 
import { Cinzel, Caveat, Poppins } from "next/font/google";
import FeaturedCafe from "@/components/FeaturedCafe";

type Cafe = {
  id: number;
  name: string;
  website: string;
  lat?: number;
  lon?: number;
  image?: string;
};

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function Home() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [featuredCafe, setFeaturedCafe] = useState<Cafe | null>(null);

  const fetchCafes = async () => {
    setLoading(true); // Show loading state
    try {
      const res = await fetch("/api/osm");
      let data: Cafe[] = await res.json();

      data = data.sort(() => 0.5 - Math.random()).slice(0, 9);

      const cafesWithImages: Cafe[] = await Promise.all(
        data.map(async (cafe) => {
          const imgRes = await fetch(`/api/og-image?url=${encodeURIComponent(cafe.website)}`);
          const imgData = await imgRes.json();
          return { ...cafe, image: imgData.image || "https://plus.unsplash.com/premium_photo-1674327105076-36c4419864cf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWVzdGhldGljJTIwY29mZmVlfGVufDB8fDB8fHww" };
        })
      );

      setCafes(cafesWithImages);
    } catch (error) {
      console.error("Error fetching cafes:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const pickRandomCafe = () => {
    if (cafes.length > 0) {
      const randomIndex = Math.floor(Math.random() * cafes.length);
      setFeaturedCafe(cafes[randomIndex]);
    }
  };

  const hideFeaturedCafe = () => {
    setFeaturedCafe(null); // Hide the featured cafe
  };

  useEffect(() => {
    fetchCafes();
  }, []);

  return (
    <div className="min-h-screen bg-orange p-4 flex flex-col items-center">
      <header className="text-center py-2">
        <h1 className={`${cinzel.className} text-6xl font-bold text-darkpurple`}>SEATTLE</h1>
        <h2 className={`${caveat.className} text-4xl text-darkpurple flex items-center`}>
          <span className="mr-2">☕</span> Coffee Explorer <span className="ml-2">☕</span>
        </h2>
      </header>

      <main className="mt-4 flex flex-col items-center">
        {/* Today's Lucky Pick */}
        <section className="text-center">
          <button
            className={`${poppins.className} w-100 py-2 bg-brown text-white font-semibold rounded-lg shadow-md hover:bg-darkpurple transition cursor-pointer`}
            onClick={pickRandomCafe}
          >
            Today's Lucky Pick
          </button>
        </section>

        
        {/* Featured Cafe (Displays on button click, can be hidden) */}
        {featuredCafe && <FeaturedCafe cafe={featuredCafe} onHide={hideFeaturedCafe} />}

        {/* Coffee 3x3 Grid */}
        <section className="mt-8">
          {loading ? (
            <p className={`${caveat.className} mt-4 text-4xl text-darkpurple font-semibold`}>Generating new picks...<span className="mr-2">☕🥐🍵</span></p>
          ) : (
            <CoffeeGrid cafes={cafes} />
          )}
        </section>
      </main>

      {/* Floating Dice Button (Triggers Refresh) */}
      <button
        className="fixed bottom-10 right-10 bg-brown text-white p-4 rounded-full shadow-lg hover:bg-darkpurple transition flex items-center justify-center cursor-pointer"
        onClick={fetchCafes} // Click to refresh the grid
        disabled={loading} // Disable while loading
      >
        {loading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-black"></div> // Spinner
        ) : (
          <FaDice size={36} />
        )}
      </button>
    </div>
  );
}
