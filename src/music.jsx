import { useEffect } from "react";  
import song from "./image/song.mp3"; 

export default function Music() {
  useEffect(() => {
    const audio = document.getElementById("bg-music");

    const playAudio = async () => {
      try {
        audio.muted = false;
        await audio.play();
      } catch (err) {
        console.log("Autoplay blocked by browser");
      }
    };

    playAudio();
  }, []);

  return (
    <audio id="bg-music" autoPlay loop>
      <source src={song} type="audio/mpeg" />
    </audio>
  );
}