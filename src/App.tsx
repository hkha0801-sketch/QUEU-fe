import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import logo from "./components/Logo.png";

const App: React.FC = () => {
  return (
    <BrowserRouter>

      <img src={logo} className="app-logo-fixed" alt="QUEU" />
      <Navbar />
      <Sidebar />
      <Modal />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/*" element={
          <>
            <img src={logo} className="app-logo-fixed" alt="QUEU" />
            <Navbar />
            <Sidebar />
            <Modal />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;