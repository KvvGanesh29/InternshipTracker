import React, { useState, useEffect } from "react";
import "../styles/SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar-input"
        placeholder="🔍 Search by student, company, or role..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
