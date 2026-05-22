import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

export interface IHome {}

const Home: React.FC<IHome> = (): React.ReactElement => {
  const { openModal, openSidebar } = useGlobalContext();

  return (
    <>
      <main>
        <button type="button" className="sidebar-toggle" onClick={openSidebar}>
          <FaBars />
        </button>
        <button type="button" className="btn" onClick={openModal}>
          show modal
        </button>
      </main>
    </>
  );
};

export default Home;
