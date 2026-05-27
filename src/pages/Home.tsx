import React from "react";
import { useGlobalContext } from "../components/context";

export interface IHome {}

const Home: React.FC<IHome> = (): React.ReactElement => {
  const { openModal, openSidebar } = useGlobalContext();

  return (
    <>
      <main>
        <button type="button" className="btn" onClick={openModal}>
          show modal
        </button>
      </main>
    </>
  );
};

export default Home;
