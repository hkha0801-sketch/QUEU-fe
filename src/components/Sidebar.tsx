import React from "react";
import logo from "./Logo.png";
import { FaTimes } from "react-icons/fa";
import {links } from "./data";
import { useGlobalContext } from "./context";

export interface ISidebar {}

const Sidebar: React.FC<ISidebar> = (): React.ReactElement => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    <aside className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <img src={logo} className="logo" alt="QUEU" />
        <button type="button" className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <ul className="links">
        {links.map((link) => {
          const { id, text, url, icon } = link;
          return (
            <li key={id}>
              <a href={url}>
                {icon}
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
