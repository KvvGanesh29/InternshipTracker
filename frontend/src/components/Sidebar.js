import React, { useState } from "react";
import "../styles/Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className="sidebar-content">
        <h1 className="sidebar-title">📋 InternTracker</h1>
        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-item">📊 Dashboard</a>
          <a href="#applications" className="nav-item">📝 Applications</a>
          <a href="#analytics" className="nav-item">📈 Analytics</a>
          <a href="#settings" className="nav-item">⚙️ Settings</a>
        </nav>
        <div className="sidebar-footer">
          <p>© 2026 InternTracker</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
