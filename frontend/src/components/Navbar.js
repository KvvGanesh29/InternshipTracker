import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Internship Tracker</h2>
      </div>

      <div className="navbar-right">
        <a href="/">Dashboard</a>
        <a href="/">Applications</a>
        <a href="/">Analytics</a>
      </div>
    </nav>
  );
}

export default Navbar;