import React from "react";

// Functional component demonstrating JSX and props
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <span className="header-icon">🎯</span>
          TaskFlow
        </h1>
        <p className="header-subtitle">
          Your Personal Task Manager - Built with React
        </p>
      </div>
    </header>
  );
};

export default Header;

