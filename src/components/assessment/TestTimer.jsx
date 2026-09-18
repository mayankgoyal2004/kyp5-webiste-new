import React, { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";

export default function TestTimer({ expiresAt, onTimeExpired }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const end = new Date(expiresAt).getTime();
      const diff = Math.max(0, Math.floor((end - now) / 1000));

      setTimeLeft(diff);

      if (diff <= 0) {
        if (onTimeExpired) onTimeExpired();
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, onTimeExpired]);

  if (timeLeft === null) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isCritical = timeLeft < 300; // less than 5 mins

  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-colors ${
        isCritical ? "bg-red-50 text-red-700 border-red-300 animate-pulse" : "bg-indigo-50 text-indigo-800 border-indigo-200"
      }`}
    >
      {isCritical ? (
        <AlertTriangle className="w-4 h-4 text-red-600" />
      ) : (
        <Clock className="w-4 h-4 text-indigo-600" />
      )}
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
