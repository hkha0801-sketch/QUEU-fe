import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { FaBell, FaFire, FaCog } from "react-icons/fa";

const navItems = [
  { id: 1, label: "Problems", url: "/problems" },
  { id: 2, label: "Contests", url: "/contests" },
  { id: 3, label: "Submissions", url: "/submissions" },
  { id: 4, label: "Ranking", url: "/ranking" },
  { id: 5, label: "About", url: "/about" },
  { id: 6, label: "Report", url: "/report" },
];

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-logo">
        <img src={logo} alt="QUEU" />
      </NavLink>

      <nav className="navbar-links">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.url}
            className={({ isActive }) =>
              `navbar-link${isActive ? " active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar-actions">
        <button className="navbar-icon-btn" aria-label="Notifications">
          <FaBell />
        </button>
        <div className="navbar-streak">
          <FaFire className="streak-icon" />
          <span>67</span>
        </div>
        <button className="navbar-icon-btn" aria-label="Settings">
          <FaCog />
        </button>
        <button className="navbar-avatar-btn" aria-label="Profile">
          <img src="/shidoon-blue-icon.jpg" alt="avatar" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
