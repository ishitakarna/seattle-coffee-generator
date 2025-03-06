import { useEffect, useState } from "react";
import { Caveat, Poppins } from "next/font/google";
import { FaExternalLinkAlt } from "react-icons/fa";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

interface Cafe {
  id: number;
  name: string;
  website: string;
  lat?: number;
  lon?: number;
  image?: string;
}

interface FeaturedCafeProps {
  cafe: Cafe | null;
  onHide: () => void;
}

export default function FeaturedCafe({ cafe, onHide }: FeaturedCafeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (cafe) {
      setIsVisible(true);
    }
  }, [cafe]);

  if (!cafe) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-orange bg-opacity-75 
                  transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} z-50`}
      onClick={onHide} // Click outside to close
    >
      <div
        className={`bg-white p-8 rounded-lg shadow-lg w-96 text-center relative transform 
                    transition-transform duration-300 ${isVisible ? "scale-100" : "scale-95"}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >

        {/* Cafe Image */}
        {cafe.image && (
          <img
            src={cafe.image}
            alt={cafe.name}
            className="w-full h-40 object-cover rounded-lg mt-4 mb-4"
          />
        )}

        <h3 className={`${caveat.className} text-4xl font-bold text-darkpurple`}>{cafe.name}</h3>

        {cafe.website && (
          <a
            href={cafe.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`${poppins.className} text-brown font-semibold hover:underline mt-2 inline-flex items-center gap-2`}
          >
            Visit Website 
            <FaExternalLinkAlt className="text-brown" size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
