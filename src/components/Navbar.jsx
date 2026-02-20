import React, { useEffect, useMemo, useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import {
  APP_SYNC_EVENT,
  dispatchAppSync,
  getCartCount,
  getCartItems,
} from "../config/api";

function Navbar() {
  const [snapshot, setSnapshot] = useState({
    isLoggedIn: false,
    fullName: "",
    cartCount: 0,
  });

  const shortName = useMemo(() => {
    const words = snapshot.fullName.trim().split(/\s+/).filter(Boolean);
    return words[0] || "Account";
  }, [snapshot.fullName]);

  useEffect(() => {
    const sync = () => {
      const token = localStorage.getItem("token");
      const fullName = localStorage.getItem("fullName") || "";
      const cartCount = getCartCount(getCartItems());
      setSnapshot({
        isLoggedIn: Boolean(token),
        fullName,
        cartCount,
      });
    };

    sync();
    window.addEventListener(APP_SYNC_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(APP_SYNC_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    dispatchAppSync();
  };

  return (
    <nav className="app-navbar" role="navigation">
      <div className="nav-inner">
        <h2 className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            FoodByMe
          </Link>
        </h2>

        <ul className="nav-links">
          <li>
            <Link to="/">Restaurant</Link>
          </li>

          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
              Cart
              {snapshot.cartCount > 0 ? (
                <span className="cart-badge" aria-label={`${snapshot.cartCount} items in cart`}>
                  {snapshot.cartCount}
                </span>
              ) : null}
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
              Orders
            </NavLink>
          </li>

          {snapshot.isLoggedIn ? (
            <>
              <li>
                <span className="account-chip" title={snapshot.fullName}>
                  Hi, {shortName}
                </span>
              </li>
              <li>
                <button type="button" className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <Link to="/signup" className="signup-btn">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
