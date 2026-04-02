import React, { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "./StatsCard";
import "../styles/Analytics.css";

function Analytics() {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    selected: 0,
    rejected: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/applications/analytics/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching analytics:", err));
  }, []);

  return (
    <div className="analytics-container">
      <h2>📊 Application Analytics</h2>
      <div className="stats-grid">
        <StatsCard title="Total Applications" count={stats.total} color="#667eea" icon="📋" />
        <StatsCard title="Applied" count={stats.applied} color="#3498db" icon="📝" />
        <StatsCard title="Interview" count={stats.interview} color="#f39c12" icon="📞" />
        <StatsCard title="Selected" count={stats.selected} color="#2ecc71" icon="✓" />
        <StatsCard title="Rejected" count={stats.rejected} color="#e74c3c" icon="✕" />
      </div>
    </div>
  );
}

export default Analytics;