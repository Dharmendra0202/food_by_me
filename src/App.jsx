import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";

export default function App() {
  return (
    <div className="app-root">
      {" "}
      <Navbar /> {/* Background dots + blobs (decorative) */}{" "}
      <div className="bg-dots" aria-hidden="true">
        {" "}
        <span className="dot dot-left dot-1" />{" "}
        <span className="dot dot-left dot-2" />{" "}
        <span className="dot dot-right dot-1" />{" "}
        <span className="dot dot-right dot-2" />{" "}
      </div>{" "}
      {/* MAIN CONTENT — ensure it's positioned above the background */}{" "}
      <main className="app-content">
        {" "}
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />{" "}
          <Route path="/signup" element={<Signup />} />{" "}
          <Route path="/login" element={<Login />} />{" "}
        </Routes>{" "}
      </main>{" "}
    </div>
  );
}
