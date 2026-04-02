import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/ThemeToggle.css";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;