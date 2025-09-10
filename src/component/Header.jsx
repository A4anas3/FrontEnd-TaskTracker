import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"; // Create this CSS file

const Header = ({ userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="company-name">Logic Lord</h1>
        {/* You can add a logo image here */}
      </div>
      <nav className="nav">
        {userRole === "ADMIN" && <Link to="/admin">Admin Dashboard</Link>}
        {userRole === "MANAGER" && <Link to="/manager">Manager Dashboard</Link>}
        {userRole === "EMPLOYEE" && (
          <Link to="/employee">Employee Dashboard</Link>
        )}
        {userRole && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;
