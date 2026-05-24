import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { links } from "../../core/navLinks";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      
      <ul className="sidebar-links">
        {links.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.url}
              end={link.url === "/"}
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active" : ""}`
              }
            >
              <span className="sidebar-link-icon">{link.icon}</span>
              <span className="sidebar-link-text">{link.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
