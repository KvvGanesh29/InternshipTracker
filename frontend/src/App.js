import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ApplicationList from "./components/ApplicationList";
import ApplicationForm from "./components/ApplicationForm";
import Analytics from "./components/Analytics";
import ChartComponent from "./components/ChartComponent";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <header className="app-header">
          <h1>🚀 Internship Application Tracker</h1>
          <div className="theme-toggle-wrapper">
            <ThemeToggle />
          </div>
        </header>

        <div className="app-container">
          <div className="app-content">
            {/* Analytics Section */}
            <div className="glass-card">
              <Analytics key={refreshKey} />
            </div>

            {/* Application Form Section */}
            <div className="glass-card">
              <h2>➕ Add New Application</h2>
              <ApplicationForm refresh={handleRefresh} />
            </div>

            {/* Chart Section */}
            <div className="glass-card">
              <ChartComponent key={refreshKey} />
            </div>

            {/* Applications List Section */}
            <div className="glass-card">
              <ApplicationList key={refreshKey} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;