import React, { useEffect, useState } from "react";

const useCountdown = (targetTime) => {
  const [timeLeft, setTimeLeft] = useState(() => targetTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = targetTime - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { hours, minutes, seconds, expired: timeLeft <= 0 };
};

const CountdownTimer = ({ expiryDate }) => {
  const { hours, minutes, seconds, expired } = useCountdown(expiryDate);

  if (!expiryDate || expired) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "#fff",
        color: "#000",
        padding: "4px 8px",
        border: "1px solid #000",
        borderRadius: "28px",        
        fontSize: "0.8rem",
        zIndex: 1,
      }}
    >
      {hours.toString().padStart(2, "0")}:
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default CountdownTimer;
