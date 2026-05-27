import React from "react";
import { links } from "./data";
import { useGlobalContext } from "./context";

export interface ISidebar {}

const Sidebar: React.FC<ISidebar> = (): React.ReactElement => {
  const { isSidebarOpen, openSidebar, closeSidebar } = useGlobalContext();

  return (
    <aside
      className={`sidebar ${isSidebarOpen ? "show-sidebar" : ""}`}
      onMouseEnter={openSidebar}
      onMouseLeave={closeSidebar}
    >
      <ul className="links">
        {links.map((link) => {
          const { id, text, url, icon } = link;
          return (
            <li key={id}>
              <a href={url}>
                <span className="link-icon">{icon}</span>
                <span className="link-text">{text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;