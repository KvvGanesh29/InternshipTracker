import React, { useEffect, useState } from "react";
import "../styles/StatsCard.css";

function StatsCard({ title, count = 0, color = "#3498db", icon = "📊" }) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count;
    const duration = 1000;
    const increment = end / (duration / 50);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayCount(end);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stats-info">
        <h3>{title}</h3>
        <p className="stats-number">{displayCount}</p>
      </div>
    </div>
  );
}

export default StatsCard;
