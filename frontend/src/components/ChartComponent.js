import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import "../styles/ChartComponent.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

function ChartComponent() {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("pie");

  useEffect(() => {
    axios.get("http://localhost:8080/api/applications/analytics/stats")
      .then((res) => {
        const data = res.data;
        const chartConfig = {
          labels: ["Applied", "Interview", "Selected", "Rejected"],
          datasets: [
            {
              label: "Status Distribution",
              data: [data.applied || 0, data.interview || 0, data.selected || 0, data.rejected || 0],
              backgroundColor: ["#3498db", "#f39c12", "#2ecc71", "#e74c3c"],
              borderColor: ["#2980b9", "#d68910", "#27ae60", "#c0392b"],
              borderWidth: 2,
            },
          ],
        };
        setChartData(chartConfig);
      })
      .catch((err) => console.error("Error fetching chart data:", err));
  }, []);

  if (!chartData) return <div className="chart-loading">Loading chart...</div>;

  return (
    <div className="chart-container">
      <h2>Application Status Distribution</h2>
      <div className="chart-toggle">
        <button
          className={chartType === "pie" ? "active" : ""}
          onClick={() => setChartType("pie")}
        >
          📊 Pie Chart
        </button>
        <button
          className={chartType === "bar" ? "active" : ""}
          onClick={() => setChartType("bar")}
        >
          📈 Bar Chart
        </button>
      </div>
      <div className="chart-wrapper">
        {chartType === "pie" ? (
          <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
        ) : (
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
        )}
      </div>
    </div>
  );
}

export default ChartComponent;