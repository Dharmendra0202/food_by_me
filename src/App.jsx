import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import BiryaniPage from "./pages/BiryaniPage";
import ParathaPage from "./pages/ParathaPage";
import TeaPage from "./pages/TeaPage";
import CoffeePage from "./pages/CoffeePage";
import KebabsPage from "./pages/KebabsPage";
import FruitsPage from "./pages/FruitsPage";
import DessertPage from "./pages/DessertPage";
import KhichdiPage from "./pages/KhichdiPage";
import ShakePage from "./pages/ShakePage";
import RasgulaPage from "./pages/RasgulaPage";
import CakesPage from "./pages/CakesPage";
import ChinesePage from "./pages/ChinesePage";
import NoodlesPage from "./pages/NoodlesPage";
import PureVegPage from "./pages/PureVegPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

export default function App() {
  return (
    <div className="app-root">
      <ScrollToTop />
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
          <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />{" "}
          <Route path="/checkout" element={<CheckoutPage />} />{" "}
          <Route path="/category/:name" element={<CategoryPage />} />{" "}
          <Route path="/biryani" element={<BiryaniPage />} />{" "}
          <Route path="/paratha" element={<ParathaPage />} />{" "}
          <Route path="/tea" element={<TeaPage />} />{" "}
          <Route path="/coffee" element={<CoffeePage />} />{" "}
          <Route path="/kebabs" element={<KebabsPage />} />{" "}
          <Route path="/fruits" element={<FruitsPage />} />{" "}
          <Route path="/desserts" element={<DessertPage />} />{" "}
          <Route path="/khichdi" element={<KhichdiPage />} />{" "}
          <Route path="/shake" element={<ShakePage />} />{" "}
          <Route path="/rasgulla" element={<RasgulaPage />} />{" "}
          <Route path="/cakes" element={<CakesPage />} />{" "}
          <Route path="/chinese" element={<ChinesePage />} />{" "}
          <Route path="/noodles" element={<NoodlesPage />} />{" "}
          <Route path="/pureveg" element={<PureVegPage />} />{" "}
        </Routes>{" "}
      </main>{" "}
    </div>
  );
}
