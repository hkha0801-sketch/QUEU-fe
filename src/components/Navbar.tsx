import React, { useState } from "react";

const navLinks = [
  { id: 1, text: "Problems", url: "/problems" },
  { id: 2, text: "Contests", url: "/contests" },
  { id: 3, text: "Submissions", url: "/submissions" },
  { id: 4, text: "Ranking", url: "/ranking" },
  { id: 5, text: "About", url: "/about" },
  { id: 6, text: "Report", url: "/report" },
];

const Navbar: React.FC = () => {
  const [active, setActive] = useState("Problems");

  return (
    <nav className="navbar">
      <div className="navbar-logo-space" />
      <ul className="navbar-links">
        {navLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              className={`navbar-link ${active === link.text ? "navbar-link--active" : ""}`}
              onClick={() => setActive(link.text)}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;