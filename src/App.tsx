import React from "react";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

export interface IApp {}

const App: React.FC<IApp> = (): React.ReactElement => {
  return (
    <>
      <Home />
      <Modal />
      <Sidebar />
    </>
  );
};

export default App;
