import React from "react";

// Functional component demonstrating props and event handlers
const FilterButtons = ({ filter, setFilter, categories }) => {
  const filterOptions = [
    { id: "all", name: "All Tasks", icon: "📋" },
    { id: "active", name: "Active", icon: "⏳" },
    { id: "completed", name: "Completed", icon: "✅" },
    ...categories.filter((cat) => cat.id !== "all"),
  ];

  return (
    <div className="filter-buttons">
      <h3>Filter Tasks</h3>
      <div className="filter-grid">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setFilter(option.id)}
            className={`filter-btn ${filter === option.id ? "active" : ""}`}
            style={{
              backgroundColor:
                filter === option.id ? option.color || "#6366f1" : "#f1f5f9",
              color: filter === option.id ? "white" : "#64748b",
            }}
          >
            <span className="filter-icon">{option.icon}</span>
            <span className="filter-text">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;

