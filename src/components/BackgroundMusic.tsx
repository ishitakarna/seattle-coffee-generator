import { useRef, useState } from "react";
import { FaMusic, FaPause } from "react-icons/fa"; 

const MUSIC_URL = "/rainyday.mp3"; // Use the local MP3 from /public folder

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top right-10 z-50 flex items-center bg-brown shadow-md rounded-full">
      <button onClick={toggleMusic} className="p-2 text-white transition cursor-pointer">
      {isPlaying ? <FaPause size={16} /> : <FaMusic size={16} />}
      </button>
      <audio ref={audioRef} src={MUSIC_URL} loop />
    </div>
  );
}
