import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import PremiumFoodPage from "./pages/PremiumFoodPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import TestConnection from "./pages/TestConnection";
import { listCatalogThemes } from "./pages/catalogThemes";
import { RESTAURANT_ROUTE_PATTERN } from "./data/restaurants";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

export default function App() {
  const catalogThemes = listCatalogThemes();

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
          <Route path="/test-connection" element={<TestConnection />} />{" "}
          <Route path="/signup" element={<Signup />} />{" "}
          <Route path="/login" element={<Login />} />{" "}
          <Route path={RESTAURANT_ROUTE_PATTERN} element={<RestaurantDetailsPage />} />{" "}
          <Route path="/checkout" element={<CheckoutPage />} />{" "}
          <Route path="/category/:name" element={<CategoryPage />} />{" "}
          {catalogThemes.map((theme) => (
            <Route
              key={theme.slug}
              path={theme.route}
              element={<PremiumFoodPage theme={theme} />}
            />
          ))}{" "}
        </Routes>{" "}
      </main>{" "}
    </div>
  );
}
