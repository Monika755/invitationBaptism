import { useEffect, useState, useRef } from "react";
import angel from "./image/angel.png";
import church from "./image/ekexeci.jpeg";
import mush from "./image/mush.jpeg";
import song from "./image/song.mp3";

export default function App() {
  const targetDate = new Date("2026-05-24T00:00:00");

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  const audioRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);

  function getTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🎵 AUTO UNMUTE MUSIC (browser-safe)
  useEffect(() => {
    const audio = audioRef.current;

    const enableSound = async () => {
      if (audio && !musicStarted) {
        try {
          audio.muted = false;
          await audio.play();
          setMusicStarted(true);
        } catch (e) {
          console.log("Autoplay blocked");
        }
      }
    };

    window.addEventListener("click", enableSound);
    window.addEventListener("scroll", enableSound);

    return () => {
      window.removeEventListener("click", enableSound);
      window.removeEventListener("scroll", enableSound);
    };
  }, [musicStarted]);

  return (
    <div>
      {/* 🎵 MUSIC */}
      <audio ref={audioRef} autoPlay loop muted>
        <source src={song} type="audio/mpeg" />
      </audio>

      <h1 className="text">Մկրտության հրավեր</h1>

      <div className="container">
        <h2>Լիդա Միլենա</h2>
        <img src={angel} alt="angel" />
      </div>

      <div className="countdown">
        <h3>Մնաց</h3>
        <p>
          <span>{String(timeLeft.days).padStart(2, "0")}</span> օր |
          <span>{String(timeLeft.hours).padStart(2, "0")}</span> ժամ |
          <span>{String(timeLeft.minutes).padStart(2, "0")}</span> րոպե |
          <span>{String(timeLeft.seconds).padStart(2, "0")}</span> վայրկյան
        </p>
      </div>

      <div className="invite-text">
        <h3>Բարեկամներ և ընկերներ</h3>
        <p>
          Սիրով հրավիրում ենք Ձեզ կիսելու մեզ հետ
          Լիդայի և Միլենայի Սուրբ Մկրտության
          լուսավոր օրը։
        </p>
        <h4>Սպասում ենք Ձեզ</h4>
      </div>

      <div className="event-info">
        <h2>24 Մայիսի</h2>
        <h3>2026</h3>

        <p>16:00</p>
        <h4>Մկրտություն</h4>

        <h5>Սուրբ Կարապետ եկեղեցի</h5>
        <p>Գյուղ Ջանֆիդա</p>

        <img className="church-img" src={church} alt="church" />

        <a
  className="location-btn"
  href="https://yandex.com/maps/-/CPGdb4Ko"
  target="_blank"
  rel="noopener noreferrer"
>
  Ինչպես հասնել
</a>

        <p className="time">17։30</p>

        <h4>Խնջույք</h4>

        <h5>Mush restaurant</h5>
        <p>Գյուղ Նալբանդյան</p>

        <img className="church-img" src={mush} alt="mush restaurant" />

        <a
  className="location-btn"
  href="https://yandex.com/maps/-/CPGdJKyZ"
  target="_blank"
  rel="noopener noreferrer"
>
  Ինչպես հասնել
</a>
      </div>
    </div>
  );
}