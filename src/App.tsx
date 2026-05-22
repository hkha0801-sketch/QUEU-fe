import React from "react";
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import Home from "./Home";

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
