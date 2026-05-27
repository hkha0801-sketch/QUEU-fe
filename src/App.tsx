import React from "react";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import logo from "./components/Logo.png";

const App: React.FC = () => {
  return (
    <>
      <img src={logo} className="app-logo-fixed" alt="QUEU" />
      <Navbar />
      <Home />
      <Modal />
      <Sidebar />
    </>
  );
};

export default App;