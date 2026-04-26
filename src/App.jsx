import { useEffect, useState } from "react";

export default function App() {
  const targetDate = new Date("2026-05-24T00:00:00");

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

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

  return (
    <>
      <h1 className="text">Մկրտության հրավեր</h1>

      <div className="container">
        <h2>Լիդա Միլենա</h2>
        <img src="/angel.png" alt="angel" />
      </div>

      <div className="countdown">
        <h3>Մնաց</h3>
        <p>
          {timeLeft.days} օր |{timeLeft.hours} ժամ |{timeLeft.minutes} րոպե |{timeLeft.seconds} վայրկյան
        </p>
      </div>
    </>
  );
}