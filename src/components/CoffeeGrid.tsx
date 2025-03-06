import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });
const placeholderImages = [
  "https://plus.unsplash.com/premium_photo-1674327105076-36c4419864cf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWVzdGhldGljJTIwY29mZmVlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1619745445488-9c9cc94a4b14?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661594835845-7035de5abb30?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?q=80&w=1008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// Define the Cafe type
type Cafe = {
  id: number;
  name: string;
  website: string;
  lat?: number;
  lon?: number;
  image?: string;
};

// Define props for CoffeeGrid component
type CoffeeGridProps = {
  cafes: Cafe[];
};

const getRandomPlaceholder = () => {
  return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
};

export default function CoffeeGrid({ cafes }: CoffeeGridProps) {
  return (
    <section className="mt-8">
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-4">
          {cafes.map((cafe) => {
            const imageSrc = cafe.image || getRandomPlaceholder();
            console.log(imageSrc)
            return (
            <div key={cafe.id} className="relative w-42 h-42 rounded-lg overflow-hidden border-4 border-vanilla rounded-lg">
              <Image
                src={imageSrc}
                alt={cafe.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                unoptimized
              />
              <div className={`${poppins.className} absolute bottom-0 bg-brown bg-opacity-50 text-white text-center text-sm font-bold w-full py-1`}>
                <a href={cafe.website} target="_blank" rel="noopener noreferrer">
                  {cafe.name}
                </a>
              </div>
            </div>)
          })}
        </div>
      </div>
    </section>
  );
}
